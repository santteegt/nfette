import types from "./types";

const reducer = (state, action)=> {
    switch (action.type) {
        
        case types.createNFT.SET_NAME:
            return {...state, nftDetails: {...state.nftDetails, name: action.payload}}
        case types.createNFT.SET_SYMBOL:
            return {...state, nftDetails: {...state.nftDetails, symbol: action.payload}}
        case types.createNFT.SET_URL:
            return {...state, nftDetails: {...state.nftDetails, url: action.payload}}
        case types.token.SET_NAME:
            return{...state, shareDetails: {...state.shareDetails, name: action.payload.toUpperCase() + "SHARE-00"}}
        case types.token.SET_SYMBOL: 
            return {...state, shareDetails: {...state.shareDetails, symbol: state.shareDetails.name.slice(0, 4)}}
        case types.collateralAndPrice.SET_COLLATERAL: 
            return {...state, collateralType: action.payload }
        case types.collateralAndPrice.SET_PRICE: 
            return {...state, initialPrice: action.payload }
        case types.curve.SET_CURVE:
            return {...state, curveShape: action.payload}
        case types.riskProfile.SET_RISK: 
            return {...state, riskProfile: action.payload}
        case types.provider.SET_PROVIDER: 
            return {...state, provider: action.payload}
        case types.createMarket.CREATE_MARKET_PENDING:
            return {...state, createMarketPending: true}
        case types.createMarket.CREATE_MARKET_FAIL:
            return {...state, createMarketPending: false, error: action.payload, createMarketSuccess: false}
        case types.createMarket.CREATE_MARKET_SUCCESS:
            return {...state, createMarketPending: false, nftMarketData: action.payload, createMarketSuccess: true}
        default:
            return state
    }
}

export default reducer;