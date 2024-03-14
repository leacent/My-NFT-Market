// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    string public _name;
    string public _symbol;

    address public _deployer;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _deployer = msg.sender;
        _mint(msg.sender, 1000000 * 1e18);
    }

    function getDeployer() external view returns (address) {
        return _deployer;
    }

    function getBalance(address addr) external view returns (uint256) {
        return balanceOf(addr);
    }

    function getAllowance(address spender) external view returns (uint256) {
        return allowance(msg.sender, spender);
    }
}
