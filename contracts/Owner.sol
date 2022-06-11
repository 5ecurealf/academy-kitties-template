pragma solidity >=0.4.22 <0.9.0;

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