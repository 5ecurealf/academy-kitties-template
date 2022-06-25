pragma solidity ^0.8.6;

contract isOwner {
    address private _owner;
    constructor() public{
        _owner = msg.sender;
    }

    modifier onlyOwner{
        require(msg.sender == _owner);
        _;
    }
}