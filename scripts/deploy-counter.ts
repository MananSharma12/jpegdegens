import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import type { Contract } from "ethers";

async function deployCounter() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.deployed();

    return counter;
}

// @ts-ignore
async function count(counter: Contract) {
    await counter.count();
    console.log("Counter", await counter.getCount());
}


deployCounter().then(count);
