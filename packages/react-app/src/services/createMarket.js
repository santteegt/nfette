import { ethers } from "ethers";

const createMarket = async (state)=> {
    const {provider}= state;
    const signer = provider.getSigner();
    const contract = new ethers.Contract() // address, abi, signer

    const result = await contract.createMarket(
        state.nftDetails.name,
        state.nftDetails.address,
        100,
        "USDC",
        state.curveShape,
        state.shareDetails.name,
        state.shareDetails.symbol,
        "" // this is how we pass in the liquidity pool, prolly an address
    )
    return result;
}

export default createMarket;