import { ethers } from 'ethers';
import Counter from '../artifacts/contracts/Counter.sol/Counter.json';

function getEth() {
    const eth = window?.ethereum;

    if (!eth) {
        throw new Error("No Ethereum provider found");
    }

    return eth;
}

async function hasAccounts() {
    const eth = getEth();
    const accounts = await eth.request({
        method: "eth_accounts",
    }) as string[];

    return accounts && accounts.length;
}

async function requestAccounts() {
    const eth = getEth();
    const accounts = await eth.request({
        method: "eth_requestAccounts",
    }) as string[];

    return accounts && accounts.length;
}

async function run() {
    if (!await hasAccounts() && !await requestAccounts()) {
        throw new Error("No accounts found");
    }

    const counter = new ethers.Contract(
        "0x2279b7a0a67db372996a5fab50d91eaa73d2ebe6",
        Counter.abi,
        new ethers.providers.Web3Provider(getEth()).getSigner()
    );

    const el = document.createElement("div");
    async function setCounter(count?: any) {
        el.innerHTML = count || await counter.getCount();
    }
    setCounter();

    const button = document.createElement("button");
    button.innerText = "Increment";
    button.onclick = async () => {
        await counter.count();
    };

    counter.on(counter.filters.CounterInc(), (count) => {
        setCounter(count);
    });

    document.body.appendChild(el);
    document.body.appendChild(button);
}

run();
