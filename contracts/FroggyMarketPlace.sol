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
    
    Offer[] offers;

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
        Offer memory offer = tokenIdToOffer[_tokenId];
        require(offer.active == true, "No active offer for provided token ");
        seller = offer.seller;
        price = offer.price;
        index = offer.index;
        tokenId = offer.tokenId;
        active = offer.active;
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

        require(_onlyOneOffer(_tokenId),"An offer already exists");

        require(_isOperator(msg.sender,this.address),"Marketplace is not setup as an owner");
        
        Offer memory newOffer = Offer(_tokenId, msg.sender, _price,0,true);
        offers.push(newOffer);

        emit MarketTransaction("Create offer", msg.sender, _tokenId);

    }

    function _isOwner(uint256 _tokenId) private returns (bool) {
        return FroggyContractOwnerOf(froggyContractAddress).ownerOf(_tokenId);
    }

    function _onlyOneOffer(uint256 _tokenId) view public returns (bool) {
        uint256 noOfOffers = offers.length;

        for(uint i = 0; i<noOfOffers; i++){
            if(offers[i].tokenId == _tokenId){
                return false;
            }
        }
        return true;
    }

    function _isOperator(address _owner, address _operator) private returns (bool) {
        return FroggyContractisOperator(froggyContractAddress).isApprovedForAll(_owner, _operator);
    }

    // externally called function which proves this contract can handle ERC721 tokens   
    function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes calldata _data) external pure returns(bytes4){
        return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    }
}