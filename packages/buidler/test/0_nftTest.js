const { ethers, waffle } = require("@nomiclabs/buidler");
// const { waffle } = require("@nomiclabs/buidler");
const { /*use,*/ expect } = require("chai");
// const { deployContract, solidity, MockProvider } = require("ethereum-waffle");
const { deployContract, provider } = waffle;
// use(solidity);

describe("NFT test", async () => {

    let nftName
    let nftSymbol
    let baseURI
    let myNFT

    // const provider = new MockProvider()

    const [owner, addr1] = provider.getWallets()

    beforeEach("Init contracts before each test", async () => {
        nftName = "MyNFette"
        nftSymbol = "NFETTE"
        baseURI = "nfette.io"
        const MyNFT = await ethers.getContractFactory("MyNFT")
        myNFT = await MyNFT.deploy(nftName, nftSymbol, baseURI)
    })

    it("Should match myNFT metadata", async () => {
        console.log('myNFT address', myNFT.address);

        expect(await myNFT.name()).to.equal(nftName);
        expect(await myNFT.symbol()).to.equal(nftSymbol);
        expect(await myNFT.baseURI()).to.equal(baseURI);
    })

    it("Should mint myNFT to me", async () => {
        const to = addr1.address
        const tokenId = ethers.BigNumber.from(ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["address"], [to])))
        await myNFT.mint(to, tokenId)
        expect(await myNFT.totalSupply()).to.equal(ethers.BigNumber.from(1))
        expect(await myNFT.ownerOf(tokenId)).to.equal(to)
    })


})