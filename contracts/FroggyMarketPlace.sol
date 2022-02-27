pragma solidity >=0.4.22 <0.9.0;

import "./Owner.sol";
import "./IFroggyMarketplace.sol";

interface FroggyContractOwnerOf {
    function ownerOf(uint256 tokenId) external view returns (address owner);
}

interface FroggyContractisOperator {
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
}

contract FroggyMarketPlace is IfroggyMarketPlace, isOwner{
    
    address froggyContractAddress; 

    constructor(address _froggyContractAddress){
        setfroggyContract(_froggyContractAddress);
    }

    struct Offer{
        uint256 tokenId;
        address seller;
        uint256 price;
        uint256 index;
        bool active;
    }
    
    uint256[] tokenIds;

    mapping(uint256 => Offer) tokenIdToOffer;

    
    /*
    * Set the current froggyContract address and initialize the instance of froggycontract.
    * Requirement: Only the contract owner can call.
    • me: needs to be called in the constructor 
    */
    function setfroggyContract(address _froggyContractAddress) public onlyOwner{
        froggyContractAddress = _froggyContractAddress;
    }

    /**
    * Get the details about a offer for _tokenId. Throws an error if there is no active offer for _tokenId.
     */
    function getOffer(uint256 _tokenId) external view returns ( address seller, uint256 price, uint256 index, uint256 tokenId, bool active){
        require(_offerExists(_tokenId) == true, "No active offer for provided token ");
        seller = tokenIdToOffer[_tokenId].seller;
        price = tokenIdToOffer[_tokenId].price;
        index = tokenIdToOffer[_tokenId].index;
        tokenId = tokenIdToOffer[_tokenId].tokenId;
        active = tokenIdToOffer[_tokenId].active;
    }

    /**
    * Get all tokenId's that are currently for sale. Returns an empty arror if none exist.
     */
    function getAllTokenOnSale() external view  returns(uint256[] memory listOfOffers){
        uint256 noOfOffers = tokenIds.length;
        
        uint256[] memory _listOfOffers = new uint256[](noOfOffers);

        for(uint i = 0; i<noOfOffers; i++){
            _listOfOffers[i] = tokenIds[i];
        }

        listOfOffers = _listOfOffers;
    }

    /**
    * Creates a new offer for _tokenId for the price _price.
    * Emits the MarketTransaction event with txType "Create offer"
    * Requirement: Only the owner of _tokenId can create an offer.
    * Requirement: There can only be one active offer for a token at a time.
    * Requirement: Marketplace contract (this) needs to be an approved operator when the offer is created.
     */
    function setOffer(uint256 _price, uint256 _tokenId) external{
        require(
            msg.sender == _isOwner(_tokenId), "Only owner can create an offer to sell the frog" 
        );

        require(!_offerExists(_tokenId),"An offer already exists");

        require(_isOperator(msg.sender,address(this)),"Marketplace is not setup as an operator");
        
        Offer memory newOffer = Offer(_tokenId, msg.sender, _price,0,true);      
        tokenIdToOffer[_tokenId] = newOffer;
        tokenIds.push(_tokenId);
        tokenIdToOffer[_tokenId].index = tokenIds.length - 1;

        emit MarketTransaction("Create offer", msg.sender, _tokenId);
    }

    function _isOwner(uint256 _tokenId) private returns (address) {
        return FroggyContractOwnerOf(froggyContractAddress).ownerOf(_tokenId);
    }

    function _offerExists(uint256 _tokenId) view public returns (bool) {
        if(tokenIds.length == 0) return false;
        return (tokenIds[tokenIdToOffer[_tokenId].index] == _tokenId);
    }

    function _isOperator(address _owner, address _operator) private returns (bool) {
        return FroggyContractisOperator(froggyContractAddress).isApprovedForAll(_owner, _operator);
    }

    
    /**
    * Removes an existing offer.    
    * Emits the MarketTransaction event with txType "Remove offer"
    * Requirement: Only the seller of _tokenId can remove an offer.
     */
    function removeOffer(uint256 _tokenId) external{
        require(_offerExists(_tokenId),"Token offer does not exist");
        require(msg.sender == tokenIdToOffer[_tokenId].seller,"Only the seller of _tokenId can remove an offer.");

        uint256 idxOfTokenToDelete = tokenIdToOffer[_tokenId].index;
        uint256 tokenToMove = tokenIds[tokenIds.length-1];
        tokenIds[idxOfTokenToDelete] =  tokenToMove;
        tokenIdToOffer[tokenToMove].index = idxOfTokenToDelete;
        tokenIds.pop();

        emit MarketTransaction("Remove offer", msg.sender,_tokenId);
    }

    // externally called function which proves this contract can handle ERC721 tokens   
    function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes calldata _data) external pure returns(bytes4){
        return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    }
}