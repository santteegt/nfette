const { ethers, waffle } = require("@nomiclabs/buidler");
// const { waffle } = require("@nomiclabs/buidler");
const { /*use,*/ expect } = require("chai");
// const { deployContract, solidity, MockProvider } = require("ethereum-waffle");
const { deployContract, provider } = waffle;
// use(solidity);

nftMarketABI = require('../artifacts/NFTMarketTemplate.json').abi

describe("NFTMarketFactory test", async () => {

    let stakeToken
    let nftName
    let nftSymbol
    let baseURI
    let myNFT
    let parentToken
    let parentTokenId
    let bondingCurve
    let nftMarketTemplate
    let nftMarketFactory

    const cap = ethers.utils.parseEther("100")
    const defaultInitialBidPrice = ethers.utils.parseEther("10")
    const defaultCurveParameters = [
        ethers.utils.parseUnits("1", 2),
        ethers.utils.parseUnits("3", 4),
        ethers.utils.parseUnits("1", 1)
    ]
    // console.log(2, cap.toString())

    // const provider = new MockProvider()

    const [owner, addr1] = provider.getWallets();
    // console.log(3, owner, addr1)

    // const [owner, addr1] = await ethers.getSigners()

    beforeEach("NFTMarketFactory: Init contracts before test", async () => {

        // #######################################################
        // ################# CREATING an ERC20 Mock ##############
        // #######################################################
        // TODO: change this to use Waffle mock contacts
        const StakeToken = await ethers.getContractFactory("ERC20Mock")
        stakeToken = await StakeToken.deploy("Stake token", "STAKE")

        // console.log(4)

        // ################################################
        // ################# CREATING an NFT ##############
        // ################################################
        nftName = "MyNFette"
        nftSymbol = "NFETTE"
        baseURI = "nfette.io"
        const MyNFT = await ethers.getContractFactory("MyNFT")
        // console.log('SIGNER', MyNFT.signer)
        myNFT = await MyNFT.deploy(nftName, nftSymbol, baseURI)
        parentToken = myNFT.address
        // const to = addr1.address
        const to = owner.address
        const tokenId = ethers.BigNumber.from(ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["address"], [to])))
        await myNFT.mint(to, tokenId)
        parentTokenId = tokenId

        // console.log(5, owner.address, parentToken, parentTokenId)

        // ##############################################################
        // ################# CREATING a Curve ###########################
        // ##############################################################
        const Curve = await ethers.getContractFactory("Curve")
        bondingCurve = await Curve.deploy()

        // ##############################################################
        // ################# CREATING an NFTMarketTemplate ##############
        // ##############################################################
        const NFTMarketTemplate = await ethers.getContractFactory("NFTMarketTemplate")
        // console.log(5.5, 'got template')
        nftMarketTemplate = await NFTMarketTemplate.deploy(parentToken, parentTokenId, 
            `${nftName}_FT`, `$${nftSymbol}_SHARES`, owner.address, cap, 
            defaultInitialBidPrice, bondingCurve.address, defaultCurveParameters, stakeToken.address)

        // console.log(6, nftMarketTemplate.address)

        // #############################################################
        // ################# CREATING an NFTMarketFactory ##############
        // #############################################################
        const NFTMarketFactory = await ethers.getContractFactory("NFTMarketFactory")
        nftMarketFactory = await NFTMarketFactory.deploy(nftMarketTemplate.address)
        // console.log(7, nftMarketFactory.address)
    })

    it("Should have factory with an initialized template", async () => {
        expect(await nftMarketFactory.getMarketTemplate()).to.equal(nftMarketTemplate.address)
        expect(await nftMarketFactory.getNFTMarketCount()).to.equal(ethers.BigNumber.from(1))
        expect(await nftMarketTemplate.isInitialized()).to.equal(true)
    })

    it("Should deploy a new NFTMarket from template", async () => {
        // console.log('=== NEW MARKET')

        // #############################################################
        // ################# CREATING a new NFTMarket ##################
        // #############################################################
        const nftMarketName = `${nftName}_FT`
        const nftMarketSymbol = `$${nftSymbol}_SHARES`

        const tx = await nftMarketFactory.createMarket(
            parentToken, parentTokenId, nftMarketName, nftMarketSymbol, cap, 
            defaultInitialBidPrice, bondingCurve.address, defaultCurveParameters, stakeToken.address)

        // console.log(nftMarketFactory.filters)
        // console.log(tx)

        // ################# Checking NFTMarketCreated event ##################
        let eventSignature = 'NFTMarketCreated(address,address,address)'
        let events = await nftMarketFactory.queryFilter(eventSignature, tx.blockNumber)
        const newNFTMarketAddr = events[0].args['marketAddress']
        // console.log('New market address', newNFTMarketAddr)
        expect(events[0].args['templateAddress']).to.equal(nftMarketTemplate.address)
        expect(events[0].args['owner']).to.equal(owner.address)

        // ################# Checking NFTMarketRegistered event ##################
        eventSignature = 'NFTMarketRegistered(address,address,uint256,string,string,address,uint256,address,address)'
        events = await nftMarketFactory.queryFilter(eventSignature, tx.blockNumber)
        
        expect(events[0].args['marketAddress']).to.equal(newNFTMarketAddr)
        expect(events[0].args['parentToken']).to.equal(parentToken)
        expect(events[0].args['parentTokenId']).to.equal(parentTokenId)
        expect(events[0].args['name']).to.equal(nftMarketName)
        expect(events[0].args['symbol']).to.equal(nftMarketSymbol)
        expect(events[0].args['registeredBy']).to.equal(owner.address)
        expect(events[0].args['cap']).to.equal(cap)
        expect(events[0].args['bondingCurveAddr']).to.equal(bondingCurve.address)
        expect(events[0].args['stakeTokenAddress']).to.equal(stakeToken.address)

        // ################# Checking NFTMarket properties ##################
        const nftMarketContract = new ethers.Contract(newNFTMarketAddr, nftMarketABI, provider)
        expect(await nftMarketContract.isInitialized()).to.equal(true)
        expect(await nftMarketContract.minter()).to.equal(owner.address)
   
        // expect(tx).to.emit(nftMarketFactory, "NFTMarketCreated").withArgs(nftMarketTemplate.address, newNFTMarketAddr, owner.address)
        // tx.to.emit(nftMarketFactory, "NFTMarketRegistered").withArgs()

    })

})