import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { expect } from "chai";

describe("Hero", () => {
    async function createHero() {
        const Hero = await ethers.getContractFactory("TestHero");
        const hero = await Hero.deploy();
        await hero.deployed();

        return hero;
    }

    // @ts-ignore
    let hero: Contract;

    before(async () => {
        hero = await createHero();
    });

    it("should get a zero hero array", async () => {
        // @ts-ignore
        expect(await hero.getHeroes()).to.deep.equal([]);
    });

    it("should fail creating hero because of no payment", async () => {
        let e;
        try {
            // @ts-ignore
            await hero.createHero(0, {
                value: ethers.utils.parseEther("0.04"),
            });
        } catch (error) {
            e = error;
        }

        // @ts-ignore
        expect(e.message.includes("Please send 0.05 ETH")).to.equal(true);
    });

    it("should give correct stat values", async () => {
        const hero = await createHero();

        await hero.setRandom(69);
        await hero.createHero(0, {
            value: ethers.utils.parseEther("0.05"),
        });

        const h = (await hero.getHeroes())[0];
        expect(await hero.getMagic(h)).to.equal(16);
        expect(await hero.getHealth(h)).to.equal(2);
    });
});