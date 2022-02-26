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


    
    /*
    * Set the current froggyContract address and initialize the instance of froggycontract.
    * Requirement: Only the contract owner can call.
    • me: needs to be called in the constructor 
    */
    function setfroggyContract(address _froggyContractAddress) public onlyOwner{
        froggyContractAddress = _froggyContractAddress;
    }


    // externally called function which proves this contract can handle ERC721 tokens   
    function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes calldata _data) external pure returns(bytes4){
        return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    }
}