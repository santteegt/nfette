const { ethers, waffle } = require("@nomiclabs/buidler");
// const { waffle } = require("@nomiclabs/buidler");
const { /*use,*/ expect } = require("chai");
// const { deployContract, solidity, MockProvider } = require("ethereum-waffle");
const { deployContract, provider } = waffle;
// use(solidity);

describe("NFTMarketFactory test", async () => {

    let stakeToken
    let nftName
    let nftSymbol
    let baseURI
    let myNFT
    let parentToken
    let parentTokenId
    let bondingCurveAddr
    let nftMarketTemplate
    let nftMarketFactory
    

    const cap = ethers.utils.parseEther("100")
    // console.log(2, cap.toString())

    // const provider = new MockProvider()

    const [owner, addr1] = provider.getWallets();
    // console.log(3, owner, addr1)

    // const [owner, addr1] = await ethers.getSigners()

    beforeEach("NFTMarketFactory: Init contracts before test", async () => {

        const StakeToken = await ethers.getContractFactory("ERC20Mock")
        stakeToken = await StakeToken.deploy("Stake token", "STAKE")

        // console.log(4)
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

        // TODO: Instantiate a Curve contract
        bondingCurveAddr = addr1.address

        console.log(5, owner.address, parentToken, parentTokenId)

        const NFTMarketTemplate = await ethers.getContractFactory("NFTMarketTemplate")
        // console.log(5.5, 'got template')
        nftMarketTemplate = await NFTMarketTemplate.deploy(parentToken, parentTokenId, 
            `${nftName}_FT`, `$${nftSymbol}_SHARES`, owner.address, cap, bondingCurveAddr, stakeToken.address)

        // console.log(6, nftMarketTemplate.address)

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
        console.log('=== NEW MARKET')
        const tx = await nftMarketFactory.createMarket(
            parentToken, parentTokenId, `${nftName}_FT`, `$${nftSymbol}_SHARES`, cap, bondingCurveAddr, stakeToken.address)

        console.log(tx)

        nftMarketFactory.once("NFTMarketCreated", (params, error) => {
            console.log('EVENT NFTMarketCreated', params, error)
        })
        // tx.to.emit(nftMarketFactory, "NFTMarketCreated").withArgs()
        // tx.to.emit(nftMarketFactory, "NFTMarketRegistered").withArgs()

    })

    // it("Should mint myNFT to me", async () => {
    //     const to = addr1.address
    //     const tokenId = ethers.BigNumber.from(ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["address"], [to])))
    //     await myNFT.mint(to, tokenId)
    //     expect(await myNFT.totalSupply()).to.equal(ethers.BigNumber.from(1))
    //     expect(await myNFT.ownerOf(tokenId)).to.equal(to)
    // })

    // it("Should deploy the NFTMarketTemplate", async () => {


    // })

    // it("", async () => {

    // })

})