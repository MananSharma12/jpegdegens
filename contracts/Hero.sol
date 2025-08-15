// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Hero {
    enum Class { Mage, Healer, Barbarian }

    struct HeroData {
        Class classType;
        uint8 strength;
        uint8 health;
        uint8 dexterity;
        uint8 intellect;
        uint8 magic;
    }

    mapping(address => HeroData[]) public addressToHeroes;

    function generateRandom() public virtual view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp)));
    }

    function getHeroes() public view returns (HeroData[] memory) {
        return addressToHeroes[msg.sender];
    }

    function getClass(uint8 heroIndex) public view returns (Class) {
        return addressToHeroes[msg.sender][heroIndex].classType;
    }

    function getStrength(uint8 heroIndex) public view returns (uint8) {
        return addressToHeroes[msg.sender][heroIndex].strength;
    }

    function getHealth(uint8 heroIndex) public view returns (uint8) {
        return addressToHeroes[msg.sender][heroIndex].health;
    }

    function getDexterity(uint8 heroIndex) public view returns (uint8) {
        return addressToHeroes[msg.sender][heroIndex].dexterity;
    }

    function getIntellect(uint8 heroIndex) public view returns (uint8) {
        return addressToHeroes[msg.sender][heroIndex].intellect;
    }

    function getMagic(uint8 heroIndex) public view returns (uint8) {
        return addressToHeroes[msg.sender][heroIndex].magic;
    }

    function createHero(Class classType) public payable {
        require(msg.value >= 0.05 ether, "Please send 0.05 ETH");

        uint8[5] memory remainingStats = [0, 1, 2, 3, 4];
        uint8 len = 5;

        HeroData memory newHero;
        newHero.classType = classType;

        do {
            uint randomIndex = uint8(generateRandom() % len);
            uint8 statId = remainingStats[randomIndex];
            uint8 statValue = uint8(generateRandom() % (13 + len) + 1);

            if (statId == 0) newHero.strength = statValue;
            else if (statId == 1) newHero.health = statValue;
            else if (statId == 2) newHero.dexterity = statValue;
            else if (statId == 3) newHero.intellect = statValue;
            else if (statId == 4) newHero.magic = statValue;

            len--;
            remainingStats[randomIndex] = remainingStats[len];
        } while (len > 0);

        addressToHeroes[msg.sender].push(newHero);
    }
}
