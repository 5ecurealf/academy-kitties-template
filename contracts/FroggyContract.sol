pragma solidity >=0.4.22 <0.9.0;
import "./IERC721.sol";
import "./IERC165.sol";
import "./Owner.sol";

interface IERC721TokenReceiver {
    function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes calldata _data) external returns(bytes4);
}


contract FroggyContract is IERC721,IERC165,isOwner{

    bytes4 constant MAGIC_NUMBER = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    // _interface_id's are generated from the hashing of all IERC721 or IERC165 functions within the contract
    // these hashes are constant as all token standard contracts will output the same hash 
    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

    string private constant _name = "ALFROGS";
    string private constant _symbol = "ALF";

    uint32 public GEN0FrogCap = 10;
    uint32 public GEN0FrogCount;

    event Birth(address owner, uint256 tokenId, uint256 mum, uint256 dad, uint256 genes);

    struct Frog {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }

    Frog[] Frogs;

    mapping (uint256 => address) public frogIndexToOwner;
    mapping (address => uint256) ownershipTokenCount;

    mapping (address => mapping (address => bool)) OperatorApprovals;
    mapping (uint256 => address) FrogIdxToApprovedAddress;

    function breed(uint32 _dadId,uint32 _mumId) public{
        require(msg.sender == ownerOf(_dadId) && msg.sender == ownerOf(_mumId), "You don't own or have persmission to breed these cats");
        
        (uint256 dadDNA,,,,uint16 dadGen,) = getFrogDetails(_dadId);
        (uint256 mumDNA,,,,uint16 mumGen,) = getFrogDetails(_mumId);

        uint256 newDna = _mixDna(dadDNA,mumDNA); 
        uint16 newGeneration = _calculateGen(dadGen,mumGen);

        _createFrog(newDna,_mumId,_dadId,newGeneration,msg.sender);
        
    }

    /**
     * @dev Returns whether contract supports _interfaceId. 
     */
    function supportsInterface(bytes4 _interfaceId) public pure returns(bool){
        return _interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165;
    }

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) public view returns (uint256 balance){
        return ownershipTokenCount[owner];
    }
    /*
     * @dev Returns the total number of tokens in circulation.
     */
    function totalSupply() public view returns (uint256 total){
        return Frogs.length;
    }
    /*
     * @dev Returns the name of the token.
     */
    function name() public pure returns (string memory tokenName){
        return _name;
    }
    /*
     * @dev Returns the symbol of the token.
     */
    function symbol() public pure returns (string memory tokenSymbol){
        return _symbol;
    }
    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) public view returns (address owner){
        require(_frogExists(tokenId), "Token does not exist");
        return frogIndexToOwner[tokenId];
    }
     /* @dev Transfers `tokenId` token from `msg.sender` to `to`.
     *
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `to` can not be the contract address.
     * - `tokenId` token must be owned by `msg.sender`.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 tokenId) public{
        require(to != address(0), "cannot transfer to zero address");
        require(to != address(this), "cannot transfer to contract address");
        require( _owns(msg.sender,tokenId), "You do not own this token");
        
        _transfer(msg.sender, to, tokenId);
    }
     /* @dev Transfers `tokenId` token from `msg.sender` to `to`.
     * Returns true/false is _claimant owns _tokenId
     */
    function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
      return frogIndexToOwner[_tokenId] == _claimant;
    }

    function _transfer(address _from, address _to, uint256 _tokenId) private { 
        
        ownershipTokenCount[_to] ++;
        frogIndexToOwner[_tokenId] = _to;

        if(_from != address(0)){
            ownershipTokenCount[_from] --;   
            delete FrogIdxToApprovedAddress[_tokenId];
        }

        // Emit the transfer event.
        emit Transfer(msg.sender, _to, _tokenId);
    }

    function _createFrog(        
        uint256 _genes,
        uint32 _mumId,
        uint32 _dadId,
        uint16 _generation,
        address _owner
    ) private returns(uint256){

        Frog memory newFrog = Frog(_genes,
                                    uint64(block.timestamp),
                                    _mumId,
                                    _dadId,
                                    _generation);

        Frogs.push(newFrog);
        uint256 newTokenId = Frogs.length - 1;
        frogIndexToOwner[newTokenId] = _owner;
        ownershipTokenCount[_owner] ++;

        emit Birth(_owner,newTokenId,_mumId,_dadId,_genes);

        return newTokenId;

    }

    function createFrogGen0(uint256 _genes) public onlyOwner returns(uint256) {
        require(GEN0FrogCount<=GEN0FrogCap, "Max limit of 10 Gen0 Frogs created");
        GEN0FrogCount++;
        return _createFrog(_genes, 0,0,0,msg.sender);
    }

   
    
    function getFrogDetails(uint256 tokenId) public view returns(
        uint256 genes,
        uint64 birthTime,
        uint32 mumId,
        uint32 dadId,
        uint16 generation,
        address owner)
    {
        Frog storage frog = Frogs[tokenId];

        genes = frog.genes;
        birthTime = frog.birthTime;
        mumId = frog.mumId;
        dadId = frog.dadId;
        generation = frog.generation;
        owner = frogIndexToOwner[tokenId];        
        
    }

    function approve(address _approved, uint256 _tokenId) external {
        
        require(_frogExists(_tokenId),"Frog does not exist");

        require(msg.sender == ownerOf(_tokenId) || 
        OperatorApprovals[ownerOf(_tokenId)][msg.sender],
        "Only the owner or operator of this token can approve another address");
        
        require(msg.sender != _approved, "Can't approve yourself");

        FrogIdxToApprovedAddress[_tokenId] = _approved;

        emit Approval(ownerOf(_tokenId), _approved, _tokenId);
    }

    function setApprovalForAll(address _operator, bool _approved) external{
        require(msg.sender != _operator, "Cannot set yourself as an operator ");
        OperatorApprovals[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function getApproved(uint256 _tokenId) public view returns(address){
        require(_frogExists(_tokenId),"token ID provided is not a valid NFT");
        return FrogIdxToApprovedAddress[_tokenId];
    }

    function isApprovedForAll(address _owner, address _operator) public view returns (bool){
        return OperatorApprovals[_owner][_operator];
    }
    
    function _frogExists(uint _tokenId) private view returns(bool){
        return _tokenId< Frogs.length;
    }


    function transferFrom(address _from, address _to, uint256 _tokenId) public{
        require(_to != address(0), "recieving contract is not a valid address");
        require(_to != address(this), "cannot transfer to contract address");
        require(msg.sender == _from || 
        isApprovedForAll(_from, msg.sender) || 
        msg.sender == getApproved(_tokenId),
        "Only the Owner/Operator/Approved address of this token can transfer this token");
        require(_from == ownerOf(_tokenId), "the _from address stated is not the owner of this token ");
        require(_frogExists(_tokenId), "token specified does not exist");

        _transfer(_from, _to, _tokenId);
    }   



    ///  checks if `_to` is a smart contract (code size > 0). If so, it calls
    ///  `onERC721Received` on `_to` and throws if the return value is not
    ///  `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata data) public{
        _safeTransfer(_from, _to, _tokenId, data);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public{
        _safeTransfer(_from, _to, _tokenId, "");
    }

    function _safeTransfer(address _from,address _to,uint _tokenId, bytes memory _data) internal {
        transferFrom(_from, _to, _tokenId);
        require(_checkERC721Support(_from,_to,_tokenId,_data),"_to address cannot take ERC721 tokens");
    }

    function _checkERC721Support(address _from, address _to, uint _tokenId, bytes memory _data) internal returns(bool){

        if(!_isContract(_to)){
            return true;
        }else{
            //do external call onERC721Received on the smart contract
            bytes4 returnedData = IERC721TokenReceiver(_to).onERC721Received(msg.sender,_from,_tokenId,_data);
            return returnedData == MAGIC_NUMBER;
        }
    }


    function _isContract(address _addr) private view returns (bool isContract){
        uint32 size;
        assembly {
            size := extcodesize(_addr)
        }
        return (size > 0);
    }

    function _mixDna(uint256 _dadDna, uint256 _mumDna) internal pure returns(uint256){

        //11 22 33 44 55 66 77 88 
        //12 34 45 56 67 78 89 01
        uint256 dadHalf = _dadDna / 100000000;
        uint256 mumHalf = _mumDna % 100000000;
        return (100000000 * dadHalf) + mumHalf;
    }

    function _calculateGen(uint16 _dadGen, uint16 _mumGen) private pure returns(uint16){
        //this function makes sure if breeding with higher generation number, the offspring will become lower generation
        if(_dadGen == 0 && _mumGen == 0 ){
            return 1;
        }else{
            return (_dadGen + _mumGen + 1) / 2;
        }
    }

}   