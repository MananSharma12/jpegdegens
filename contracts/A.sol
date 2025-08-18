// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "hardhat/console.sol";
import "./Storage.sol";

contract A {
    AppStorage s;

    function setA(uint _a) public {
        s.a = _a;
    }

    function getA() public view returns (uint) {
        return s.a;
    }
}

contract B {
    AppStorage s;

    constructor(address _A) {
        s.A = _A;
    }

    function setB(uint _b) public {
        s.b = _b;

        s.A.delegatecall(
            abi.encodeWithSignature("setA(uint256)", _b + 1)
        );
        // A(s.A).setA(_b + 1);
    }

    function getB() public view returns (uint) {
        return s.b;
    }
}
