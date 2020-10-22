import { ethers } from 'ethers';
import React, { useContext } from 'react';
import { ethers } from 'ethers';
import { Store } from '../store/store';


const createMarket = async (props)=> {
    // data comes from the UI, is modified, and sent to curve factory.
    const { state, actions } = useContext(store);
    const { provider } = state;

    const signer = provider.getSigner();
    const contract = new ethers.Contract() // address, abi, signer

    const result = await contract.createMarket(
        props.nftDetails.name,
        props.nftDetails.address,
        100,
        "USDC",
        props.curveShape,
        `${props.nftDetails.name}ShareTokens`
        `${props.nftDetails.name}_SHARES`,
        "" // this is how we pass in the liquidity pool, prolly an address
    )
        .catch(e => console.error(e))
}

export default createMarket;