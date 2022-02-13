pragma solidity >=0.4.22 <0.9.0;

contract Dummy{

    function helloWorld() public pure returns(string memory message){
        message = "hello world";
    }
    function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes calldata _data) external pure returns(bytes4){
        return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    }

}