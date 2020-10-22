const { ethers, waffle } = require("@nomiclabs/buidler");
// const { waffle } = require("@nomiclabs/buidler");
const { /*use,*/ expect } = require("chai");
const { BigNumber } = require("ethers");
// const { deployContract, solidity, MockProvider } = require("ethereum-waffle");
const { deployContract, provider } = waffle;
// use(solidity);

nftMarketABI = require('../artifacts/NFTMarketTemplate.json').abi

describe("NFTMarket test", async () => {

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
    let nftMarketDefault
    let nftMarketConv
    let nftMarketExp

    const ZERO_BALANCE = ethers.utils.parseUnits("0", 18)
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
    const cap = ethers.utils.parseEther("100")
    const defaultInitialBidPrice = ethers.utils.parseEther("10")
    // const defaultCurveParameters = [
    //     ethers.utils.parseUnits("0", 18),
    //     // ethers.utils.parseUnits("2", 1), // 10
    //     ethers.utils.parseUnits("6", 2),
    //     ethers.utils.parseUnits("1", 1)
    // ]
    const exponentialCurveParameters = [
        ethers.utils.parseUnits("3", 1),
        ethers.utils.parseUnits("1", 0),
        ethers.utils.parseUnits("1", 0)
    ]
    const parabolicCurveParameters = [
        ethers.utils.parseUnits("0", 18),
        ethers.utils.parseUnits("5", 0),
        ethers.utils.parseUnits("1", 0)
    ]
    const linearCurveParameters = [
        ethers.utils.parseUnits("0", 18),
        // ethers.utils.parseUnits("2", 1), // 10
        ethers.utils.parseUnits("0", 18),
        ethers.utils.parseUnits("10", 18)
    ]
    const defaultCurveParameters = linearCurveParameters
    console.log('EXAMPLE', ethers.utils.parseUnits("0.01", 18).toString())
    
    const [owner, staker1, staker2, staker3] = provider.getWallets();
    
    beforeEach("NFTMarket: Init contracts before test", async () => {

        // #######################################################
        // ################# CREATING an ERC20 Mock ##############
        // #######################################################
        // TODO: change this to use Waffle mock contacts
        if (!stakeToken) {
            console.log('Deploying an ERC20Mock...')
            const StakeToken = await ethers.getContractFactory("ERC20Mock")
            stakeToken = await StakeToken.deploy("Stake token", "STAKE")

            stakeToken.mint(owner.address, ethers.utils.parseEther("100"));
            stakeToken.mint(staker1.address, ethers.utils.parseEther("100"));
            stakeToken.mint(staker2.address, ethers.utils.parseEther("100"));
            stakeToken.mint(staker3.address, ethers.utils.parseEther("100"));
        }

        // ################################################
        // ################# CREATING an NFT ##############
        // ################################################
        if (!myNFT) {
            nftName = "MyNFette"
            nftSymbol = "NFETTE"
            baseURI = "nfette.io"
            const MyNFT = await ethers.getContractFactory("MyNFT")
            myNFT = await MyNFT.deploy(nftName, nftSymbol, baseURI)
            parentToken = myNFT.address
            const to = owner.address
            const tokenId = ethers.BigNumber.from(ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["address"], [to])))
            await myNFT.mint(to, tokenId)
            parentTokenId = tokenId
        }

        // ##############################################################
        // ################# CREATING a Curve ###########################
        // ##############################################################
        if (!bondingCurve) {
            const Curve = await ethers.getContractFactory("Curve")
            bondingCurve = await Curve.deploy()
        }

        // ##############################################################
        // ################# CREATING an NFTMarketTemplate ##############
        // ##############################################################
        if (!nftMarketTemplate) {
            const NFTMarketTemplate = await ethers.getContractFactory("NFTMarketTemplate")
            nftMarketTemplate = await NFTMarketTemplate.deploy(parentToken, parentTokenId, 
                `${nftName}_FT`, `$${nftSymbol}_SHARES`, owner.address, cap, 
                defaultInitialBidPrice, bondingCurve.address, defaultCurveParameters, stakeToken.address)
        }

        // #############################################################
        // ################# CREATING an NFTMarketFactory ##############
        // #############################################################
        if (!nftMarketFactory) {
            const NFTMarketFactory = await ethers.getContractFactory("NFTMarketFactory")
            nftMarketFactory = await NFTMarketFactory.deploy(nftMarketTemplate.address)
        }

    })

    it("Should create a new NFTMarket with default bonding curve parameters", async () => {
        // #############################################################
        // ################# CREATING a new NFTMarket ##################
        // #############################################################

        let curveParams = defaultCurveParameters
        // let curveParams = parabolicCurveParameters
        // let curveParams = exponentialCurveParameters

        const nftMarketName = `${nftName}_FT`
        const nftMarketSymbol = `$${nftSymbol}_SHARES`
        const tx = await nftMarketFactory.createMarket(
            parentToken, parentTokenId, nftMarketName, nftMarketSymbol, cap, 
            defaultInitialBidPrice, bondingCurve.address, curveParams, stakeToken.address)
        let events = await nftMarketFactory.queryFilter('NFTMarketCreated(address,address,address)', tx.blockNumber)
        const newNFTMarketAddr = events[0].args['marketAddress']
        nftMarketDefault = new ethers.Contract(newNFTMarketAddr, nftMarketABI, provider)

        expect(await nftMarketDefault.isInitialized()).to.equal(true)
        expect(await nftMarketDefault.minter()).to.equal(owner.address)
        expect(await nftMarketDefault.cap()).to.equal(cap)
        expect(await nftMarketDefault.initialBidPrice()).to.equal(defaultInitialBidPrice)
        expect(await nftMarketDefault.getStakeToken()).to.equal(stakeToken.address)
        // expect(await nftMarketDefault.initialBidPrice()).to.equal(defaultInitialBidPrice)
        const [a, b, c] = await nftMarketDefault.getCurve()
        expect(a).to.equal(curveParams[0])
        expect(b).to.equal(curveParams[1])
        expect(c).to.equal(curveParams[2])
        // expect(await nftMarketDefault.getCurve()).to.equal(defaultCurveParameters)
        // expect(await nftMarketDefault.getCurve()).to.equal(defaultCurveParameters)
        const [totalCap, openMarket] = await nftMarketDefault.getMarketStatus()
        expect(totalCap).to.equal(ethers.utils.parseEther("0"))
        expect(openMarket).to.equal(true)
        // console.log('Curve params', await nftMarketDefault.getCurve())
        // console.log('market Status', await nftMarketDefault.getMarketStatus())
    })

    it("Should match the initial buy price of 1 share", async () => {
        for(i=1;i<=10;i++) {
            let sharePrice = await nftMarketDefault.getBuyCost(ethers.utils.parseEther(i.toString()))
            sharePrice = ethers.utils.formatUnits(sharePrice, 'ether')
            console.log('sharePrice', (sharePrice.toString()))
        }
    })


    it(`Should be able to buy 1 share for minimal bid price (${defaultInitialBidPrice})`, async () => {

        console.log('===== buying stake')
        expect(await stakeToken.balanceOf(staker1.address)).to.equal(ethers.utils.parseEther("100"));

        await stakeToken.connect(staker1).approve(nftMarketDefault.address, defaultInitialBidPrice);
        const allowance = await stakeToken.allowance(staker1.address, nftMarketDefault.address)
        expect(allowance).to.equal(defaultInitialBidPrice)

        const sharesToBuy = ethers.utils.parseEther("1");

        console.log('supply', (await nftMarketDefault.totalSupply()).toString())
        // console.log('0x', ethers.utils.getAddress('0x0'))

        await expect(nftMarketDefault.connect(staker1).buy(sharesToBuy)).to.emit(nftMarketDefault, "Transfer")
                .withArgs(ZERO_ADDRESS, staker1.address, sharesToBuy)

        expect(await nftMarketDefault.stakeBalanceOf(staker1.address)).to.equal(defaultInitialBidPrice)
        expect(await nftMarketDefault.sharesBalanceOf(staker1.address)).to.equal(sharesToBuy)
        expect(await nftMarketDefault.totalSupply()).to.equal(sharesToBuy)
        expect(await stakeToken.balanceOf(nftMarketDefault.address)).to.equal(defaultInitialBidPrice)

    })

    it("Should increase the amount of the next share", async () => {
        let sharePrice = await nftMarketDefault.getBuyCost(ethers.utils.parseEther("2"))
        console.log('New share price', sharePrice.toString())
        expect(sharePrice).to.gt(defaultInitialBidPrice)
    })

    it("Should accept two more staked", async () => {

        const sharesToBuy2 = ethers.utils.parseEther("1");
        const sharesToBuy3 = ethers.utils.parseUnits("0.1", 18);

        // TODO
    })

    it("Should be able to withdraw his stake", async () => {
        const shares = await nftMarketDefault.sharesBalanceOf(staker1.address)
        const stake = await nftMarketDefault.stakeBalanceOf(staker1.address)
        const previousTokenBalance = await stakeToken.balanceOf(staker1.address) 
        await expect(nftMarketDefault.connect(staker1).withdraw(shares)).to.emit(nftMarketDefault, "Transfer")
                .withArgs(staker1.address, ZERO_ADDRESS, shares)

        
        expect(await nftMarketDefault.stakeBalanceOf(staker1.address)).to.equal(ZERO_BALANCE)
        expect(await nftMarketDefault.sharesBalanceOf(staker1.address)).to.equal(ZERO_BALANCE)
        expect(await nftMarketDefault.totalSupply()).to.equal(ZERO_BALANCE)
        expect(await stakeToken.balanceOf(nftMarketDefault.address)).to.equal(ZERO_BALANCE)
        const currentTokenBalance = await stakeToken.balanceOf(staker1.address)
        expect(currentTokenBalance.sub(previousTokenBalance)).to.equal(stake)

    })




    // it("Should deploy a new NFTMarket from template", async () => {
    //     // console.log('=== NEW MARKET')

    //     // #############################################################
    //     // ################# CREATING a new NFTMarket ##################
    //     // #############################################################
    //     const nftMarketName = `${nftName}_FT`
    //     const nftMarketSymbol = `$${nftSymbol}_SHARES`

    //     const tx = await nftMarketFactory.createMarket(
    //         parentToken, parentTokenId, nftMarketName, nftMarketSymbol, cap, 
    //         defaultInitialBidPrice, bondingCurve.address, defaultCurveParameters, stakeToken.address)

    //     // console.log(nftMarketFactory.filters)
    //     // console.log(tx)

    //     // ################# Checking NFTMarketCreated event ##################
    //     let eventSignature = 'NFTMarketCreated(address,address,address)'
    //     let events = await nftMarketFactory.queryFilter(eventSignature, tx.blockNumber)
    //     const newNFTMarketAddr = events[0].args['marketAddress']
    //     // console.log('New market address', newNFTMarketAddr)
    //     expect(events[0].args['templateAddress']).to.equal(nftMarketTemplate.address)
    //     expect(events[0].args['owner']).to.equal(owner.address)

    //     // ################# Checking NFTMarketRegistered event ##################
    //     eventSignature = 'NFTMarketRegistered(address,address,uint256,string,string,address,uint256,address,address)'
    //     events = await nftMarketFactory.queryFilter(eventSignature, tx.blockNumber)
        
    //     expect(events[0].args['marketAddress']).to.equal(newNFTMarketAddr)
    //     expect(events[0].args['parentToken']).to.equal(parentToken)
    //     expect(events[0].args['parentTokenId']).to.equal(parentTokenId)
    //     expect(events[0].args['name']).to.equal(nftMarketName)
    //     expect(events[0].args['symbol']).to.equal(nftMarketSymbol)
    //     expect(events[0].args['registeredBy']).to.equal(owner.address)
    //     expect(events[0].args['cap']).to.equal(cap)
    //     expect(events[0].args['bondingCurveAddr']).to.equal(bondingCurve.address)
    //     expect(events[0].args['stakeTokenAddress']).to.equal(stakeToken.address)

    //     // ################# Checking NFTMarket properties ##################
    //     const nftMarketContract = new ethers.Contract(newNFTMarketAddr, nftMarketABI, provider)
    //     expect(await nftMarketContract.isInitialized()).to.equal(true)
    //     expect(await nftMarketContract.minter()).to.equal(owner.address)
   
    //     // expect(tx).to.emit(nftMarketFactory, "NFTMarketCreated").withArgs(nftMarketTemplate.address, newNFTMarketAddr, owner.address)
    //     // tx.to.emit(nftMarketFactory, "NFTMarketRegistered").withArgs()

    // })

})