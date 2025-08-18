import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

// @ts-ignore
async function deploy(name: string, ...args) {
    const Fallback = await ethers.getContractFactory(name);
    const fallback = await Fallback.deploy(...args);
    await fallback.deployed();

    console.log("Fallback deployed to:", fallback.address);

    return fallback;
}

async function fallback() {
    const a = await deploy("A");
    const b = await deploy("B", a.address);

    console.log("A", await a.getA());
    console.log("B", await b.getB());
    console.log("-----------------");

    await a.setA(42);
    console.log("A", await a.getA());
    console.log("B", await b.getB());
    console.log("-----------------");

    await b.setB(69);
    console.log("A", await a.getA());
    console.log("B", await b.getB());
    console.log("-----------------");

    // const f = await ethers.getContractAt("IFallback", fallback.address);
    // await f.count();
}

fallback();
