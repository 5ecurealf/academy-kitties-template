pragma solidity >=0.4.22 <0.9.0;

import "./Owner.sol";
import "./IFroggyMarketplace.sol";

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


    // externally called function which proves this contract can handle ERC721 tokens   
    function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes calldata _data) external pure returns(bytes4){
        return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    }
}