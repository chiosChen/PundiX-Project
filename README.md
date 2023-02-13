# PUNDIX Project

This repository is a project for Blockchain intern at PundiX 

Run the following command to install the project
```shell
npm install

```

Create a .env file to store the required keys

```
METAMASK_PRIVATE_KEY = <<METAMASK_PRIVATE_KEY>>
ETHERSCAN_API_KEY = <<ETHERSCAN_API_KEY>>
ALCHEMY_API_URL = <<ALCHEMY_API_URL>>
```

Deploy the contracts

```shell
npx hardhat compile

npx hardhat run deploy/ERC20_deploy.js --network goerli

npx hardhat run deploy/ERC721_deploy.js --network goerli


```

Verify the deployment

```shell
npx hardhat verify --network goerli <contract address>
```

Run the frontend app 

```shell

cd ./App 

npm install

npm start

```

App is deployed on Vercel

https://pundi-x-project-3mhdptxoq-chioschen.vercel.app/

---

The contracts has been deployed on Goerli testnet at addresses

ERC20 - 0x66ECEB9C63cB99d0b1998AA3eACDcae24DCc7E5F

ERC721 - 0x489A2255154674c1dF87Fde72e4d2489075464D4

