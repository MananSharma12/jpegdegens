# First Web3 Contract

## Step 1 - Initializing
- Initialize the project with hardhat 
```bash
npm install -D hardhat
npx hardhat init
```

## Step 2 - Compile
```bash
npx hardhat compile
```

## Step 3 - Adding Testing
- Add ethers, ethereum-waffle and hardhat wrapper for both
```bash
npm i -D @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle
```
- Add Chai for testing and types
```bash
npm i -D chai @types/node @types/mocha @types/chai
```
- Run the test with
```bash
npx hardhat test
```

## Step 4 - Deploy
- Create the folder in `scripts` directory
- Run Local Testnet
```bash
npx hardhat node
```
- Deploy with command
```bash
npx hardhat run scripts/<deploy_script> --network localhost
```

## Step 5 - Bundling the App
- Create html page in root directory and add the script in src folder
- Install vite
```bash
npm i -D vite
```
- Configure Vite in `vite.config.ts`
```typescript
import { defineConfig } from 'vite';

export default defineConfig({});
```