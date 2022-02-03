pragma solidity >=0.4.22 <0.9.0;
import "./IERC721.sol";
import "./Owner.sol";

contract FroggyContract is IERC721,isOwner{

    uint32 public GEN0FrogCap = 10;
    uint32 public GEN0FrogCount;

    event Birth(address owner, uint256 tokenId, uint256 mum, uint256 dad, uint256 genes);


    string private constant _name = "ALFROGS";
    string private constant _symbol = "ALF";

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
    function name() public view returns (string memory tokenName){
        return _name;
    }
    /*
     * @dev Returns the symbol of the token.
     */
    function symbol() public view returns (string memory tokenSymbol){
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
        require(tokenId<= Frogs.length, "Token does not exist");
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

        emit Birth(_owner,newTokenId,_mumId,_dadId,_genes);

        return newTokenId;

    }

    function createFrogGen0(uint256 _genes) public onlyOwner returns(uint256) {
        require(GEN0FrogCount<=GEN0FrogCap, "Max limit of 10 Gen0 Frogs created");
        GEN0FrogCount++;
        return _createFrog(_genes, 0,0,0,msg.sender);
    }

    function getFrogDetails(uint256 tokenId) external view returns(
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



}