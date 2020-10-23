const { config, ethers } = require("@nomiclabs/buidler");
const { utils } = require("ethers");
const fs = require("fs");
const chalk = require("chalk");

async function main() {
  console.log("📡 Test Aave integration \n");

  const [owner, staker] = await ethers.getSigners();
  console.log(await owner.getAddress())
  console.log((await owner.getBalance()).toString())
  console.log(await owner.getChainId())

  const ownerAddr = await owner.getAddress()

    // Kovan
    // Stake token 0xe22da380ee6B445bb8273C81944ADEB6E8450422
    // MyNFT 0x81Da9Dc238F26877D858494753Ab962002397f90
    // Curve 0xC05f87d3aC98e5F6B4801FF5D79e4375fc079074
    // NFTMarketTemplate 0xC532dB67013311955fc927850dcE06Bfcd69d519
    // NFTMarketFactory 0x25dBFf7CfDec97942F6E5969326aE1e53d85a59D

    const nftMarketABI = JSON.parse(fs.readFileSync(`${config.paths.artifacts}/NFTMarketTemplateV2.json`)).abi
    // console.log(nftMarketABI)
    // console.log(config.paths.artifacts)

    const stakeTokenABI = JSON.parse(fs.readFileSync(`${config.paths.artifacts}/IERC20.json`)).abi
    const stakeTokenContract = new ethers.Contract('0xe22da380ee6B445bb8273C81944ADEB6E8450422', stakeTokenABI, owner)
    

    const nftMarketContract = new ethers.Contract('0xC532dB67013311955fc927850dcE06Bfcd69d519', nftMarketABI, owner)
    console.log('test', await nftMarketContract.minter())

    const bidPrice = utils.parseEther("10");
    await stakeTokenContract.approve(nftMarketContract.address, bidPrice);
    console.log('Token allowance approved')

    const sharesToBuy = utils.parseEther("1");
    await nftMarketContract.buy(sharesToBuy)
    console.log('shares minted:', await nftMarketContract.sharesBalanceOf(ownerAddr))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });