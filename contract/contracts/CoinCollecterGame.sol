// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CoinCollecterGame {
    uint public points;

    constructor() payable {}

    function earnPoint() public {
        points++;
    }
}
