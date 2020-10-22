import types from "./types";

const reducer = (state, action)=> {
    switch (action.type) {
        
        case types.createNFT.SET_NAME:
            return {...state, nftDetails: {...state.nftDetails, name: action.payload}}
        case types.createNFT.SET_SYMBOL:
            return {...state, nftDetails: {...state.nftDetails, symbol: action.payload}}
        case types.createNFT.SET_URL:
            return {...state, nftDetails: {...state.nftDetails, url: action.payload}}
        case types.collateralAndPrice.SET_COLLATERAL: 
            return {...state, collateralType: action.payload }
        case types.collateralAndPrice.SET_PRICE: 
            return {...state, initialPrice: action.payload }
        case types.curve.SET_CURVE:
            return {...state, curveShape: action.payload}
        case types.riskProfile.SET_RISK: 
            return {...state, riskProfile: action.payload}
        default:
            return state
    }
}

export default reducer;