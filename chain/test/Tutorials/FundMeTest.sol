// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

import "../../contracts/Tutorials/FundMe.sol";

abstract contract FundMeTest is FundMe {
    FundMe fundMe;

    function setUp() public {
        fundMe = new FundMe(0x694AA1769357215DE4FAC081bf1f309aDC325306);
    }

    function test() public {
        fundMe.getETHPrice(
            AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306)
        );
    }
}
