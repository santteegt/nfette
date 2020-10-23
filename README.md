
## NFette - EthOnline Hackathon

Allowing creators to gain upfront funding for their next creation before they make it!

### Setup Instructions

* Installing dependencies and compiling smart contracts:


```
yarn
yarn compile
```

* In another terminal, start a local chain:

```
yarn chain
```

* Deploy the contracts in your local chain:

```
yarn deploy
```

* Deploy the frontend (WIP)

```
cd packages/react-app
yarn start
```

### Running Unit tests

* All contracts functionality can be testd using the following command:

```
yarn test
```

* For testing the Aave integration in Kovan (WIP)

```
cd packages/buidler
yarn test-aave
```

### Deploying contracts on Kovan

```
cd packages/buidler
yarn deploy-kovan
```

### Deployed contract addresses

* Kovan testnet

```
'USDC': '0xe22da380ee6B445bb8273C81944ADEB6E8450422',
'MyNFT': '0xA470d5aB139d87B423e45186CE6eEa565AA43372',
'Curve': '0x36D0a27Df5A455bD67C03D3c7f102c0F5238342a',
'NFTMarketTemplate': '0x3F03a541584856031CA287a4f1F596BB0234d624',
'NFTMarketFactory': '0xc4264861dbB055a09Aa20E39aCB7722a6C9591aF'
```


### Links of interest

[Video demo](https://www.youtube.com/watch?v=cRm4_a3VUvM&feature=youtu.be)
[Showcase](https://hack.ethglobal.co/showcase/nfette-recleMDdXRein8XMf)
