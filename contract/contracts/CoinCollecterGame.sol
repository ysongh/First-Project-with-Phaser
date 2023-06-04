// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CoinCollecterGame {
    uint public points = 0;

    constructor() payable {}

    function earnPoint() public {
        points++;
    }

    function getPoint() public view returns (uint) {
        return points;
    } 
}
