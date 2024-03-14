// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    mapping(address => uint256) Balances;
    address public _admin;

    modifier OnlyAdmin() {
        require(msg.sender == _admin, "Only Admin can call this function");
        _;
    }

    constructor() {
        _admin = msg.sender;
    }

    function deposit(uint256 amount) public payable returns (uint256) {
        Balances[msg.sender] += amount;
        return Balances[msg.sender];
    }

    function withdraw(uint256 amount) public returns (uint256) {
        require(Balances[msg.sender] >= amount, "Insufficient balance");
        Balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        return Balances[msg.sender];
    }

    function getBalance(address account) public view returns (uint256) {
        return Balances[account];
    }
}
