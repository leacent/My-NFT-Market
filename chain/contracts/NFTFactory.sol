// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {NftCollection} from "./NftCollection.sol";

/**
 * 创建 nft 的工厂合约，供用户端调用创建 nftcollection
 */
contract NftFactory {
    address private _nftImplementationAddress;
    address[] public clonedContracts;

    event NftCreated(
        address indexed nftAddress,
        address indexed owner,
        string name,
        string symbol,
        uint256 maxSupply,
        uint256 mintPrice
    );

    constructor(address _implementation) {
        _nftImplementationAddress = _implementation;
    }

    function deployNft(
        string memory name,
        string memory symbol,
        uint256 maxSupply,
        uint256 mintPrice,
        bytes32 salt
    ) external returns (address) {
        // implementation = NftCollection(Clones.clone(_nftImplementationAddress));
        address clone = Clones.cloneDeterministic(
            _nftImplementationAddress,
            salt
        );
        clonedContracts.push(clone);
        NftCollection(clone).initialize(
            msg.sender,
            name,
            symbol,
            maxSupply,
            mintPrice
        );
        emit NftCreated(clone, msg.sender, name, symbol, maxSupply, mintPrice);
        return clone;
    }

    function getClonedAddress() external view returns (address[] memory) {
        return clonedContracts;
    }
}
