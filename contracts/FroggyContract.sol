pragma solidity >=0.4.22 <0.9.0;
import "./IERC721.sol";
import "./Owner.sol";

contract FroggyContract is IERC721,isOwner{

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




}