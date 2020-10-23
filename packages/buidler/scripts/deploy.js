const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("@nomiclabs/buidler");
const { utils } = require("ethers");

async function main() {
  console.log("📡 Deploy \n");

  // auto deploy to read contract directory and deploy them all (add ".args" files for arguments)
  // await autoDeploy();
  // OR
  // custom deploy (to use deployed addresses dynamically for example:)
  // const exampleToken = await deploy("ExampleToken")
  // const examplePriceOracle = await deploy("ExamplePriceOracle")
  // const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])

  // console.log('config', config)
  // console.log('ethers', ethers.providers.getNetwork())
  // console.log('ethers', await ethers.getSigners())
  // console.log('ethers', ethers.provider)
  const [owner, addr1] = await ethers.getSigners();
  console.log(await owner.getAddress())
  console.log((await owner.getBalance()).toString())
  console.log(await owner.getChainId())
  // process.exit(0)



  // #######################################################
  // ################# CREATING an ERC20 Mock ##############
  // #######################################################

  const StakeToken = await ethers.getContractFactory("ERC20Mock")
  const stakeToken = await StakeToken.deploy("Stake token", "STAKE")
  console.log('Stake token', stakeToken.address)

  // ################################################
  // ################# CREATING an NFT ##############
  // ################################################
  const nftName = "MyNFette"
  const nftSymbol = "NFETTE"
  const baseURI = "nfette.io"
  const MyNFT = await ethers.getContractFactory("MyNFT")
  
  const myNFT = await MyNFT.deploy(nftName, nftSymbol, baseURI)
  console.log('MyNFT', myNFT.address)
  const parentToken = myNFT.address
  // const to = addr1.address
  const to = owner._address
  const tokenId = ethers.BigNumber.from(ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["address"], [to])))
  await myNFT.mint(to, tokenId)
  const parentTokenId = tokenId

  // ##############################################################
  // ################# CREATING a Curve ###########################
  // ##############################################################
  const Curve = await ethers.getContractFactory("Curve")
  const bondingCurve = await Curve.deploy()
  console.log('Curve', bondingCurve.address)

  // ##############################################################
  // ################# CREATING an NFTMarketTemplate ##############
  // ##############################################################
  const cap = utils.parseEther("100")
  const defaultInitialBidPrice = utils.parseEther("10")
  const defaultCurveParameters = [
      ethers.utils.parseUnits("1", 2),
      ethers.utils.parseUnits("3", 4),
      ethers.utils.parseUnits("1", 1)
  ]
  const NFTMarketTemplate = await ethers.getContractFactory("NFTMarketTemplate")
  // console.log(5.5, 'got template')
  const nftMarketTemplate = await NFTMarketTemplate.deploy(parentToken, parentTokenId, 
      `${nftName}_FT`, `$${nftSymbol}_SHARES`, owner._address, cap, 
      defaultInitialBidPrice, bondingCurve.address, defaultCurveParameters, stakeToken.address)
  console.log('NFTMarketTemplate', nftMarketTemplate.address)

  // #############################################################
  // ################# CREATING an NFTMarketFactory ##############
  // #############################################################
  const NFTMarketFactory = await ethers.getContractFactory("NFTMarketFactory")
  const nftMarketFactory = await NFTMarketFactory.deploy(nftMarketTemplate.address)
  console.log('NFTMarketFactory', nftMarketFactory.address)
  
}





async function deploy(name, _args) {
  const args = _args || [];

  console.log(` 🛰  Deploying ${name}`);
  const contractArtifacts = await ethers.getContractFactory(name);
  const contract = await contractArtifacts.deploy(...args);
  console.log(" 📄",
    chalk.cyan(name),
    "deployed to:",
    chalk.magenta(contract.address),
    "\n"
  );
  fs.writeFileSync(`artifacts/${name}.address`, contract.address);
  console.log("💾  Artifacts (address, abi, and args) saved to: ",chalk.blue("packages/buidler/artifacts/"),"\n")
  return contract;
}

const isSolidity = (fileName) =>
  fileName.indexOf(".sol") >= 0 && fileName.indexOf(".swp.") < 0;

function readArgumentsFile(contractName) {
  let args = [];
  try {
    const argsFile = `./contracts/${contractName}.args`;
    console.log(`📄 Reading ${argsFile}`)
    if (fs.existsSync(argsFile)) {
      args = JSON.parse(fs.readFileSync(argsFile));
    }
  } catch (e) {
    console.log(e);
  }

  return args;
}

async function autoDeploy() {
  // const contractList = fs.readdirSync(config.paths.sources);
  const contractList = [
    'mocks/ERC20Mock.sol',
    'mocks/MyNFT.sol',
    'bc/Curve.sol',
    'templates/NFTMarketTemplate.sol',
    'factory/NFTMarketFactory.sol'
  ]
  console.log('contractList', contractList)
  return contractList
    .filter((fileName) => isSolidity(fileName))
    .reduce((lastDeployment, fileName) => {
      let contractName = fileName.replace(".sol", "")
      const args = readArgumentsFile(contractName);
      contractName = contractName.substring(contractName.lastIndexOf('/') + 1);

      // Wait for last deployment to complete before starting the next
      return lastDeployment.then((resultArrSoFar) =>
        deploy(contractName, args).then((result,b,c) => {

          if(args&&result&&result.interface&&result.interface.deploy){
            let encoded = utils.defaultAbiCoder.encode(result.interface.deploy.inputs,args)
            fs.writeFileSync(`artifacts/${contractName}.args`, encoded);
          }

          return [...resultArrSoFar, result]
        })
      );
    }, Promise.resolve([]));
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
