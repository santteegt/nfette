import types from './types';

export const useActions = (state, dispatch)=> ({
    setNFTName: (data)=> {
        dispatch({type: types.createNFT.SET_NAME, payload: data})
    },
    setNFTSymbol: (data)=> {
        dispatch({type: types.createNFT.SET_SYMBOL, payload: data})
    },
    setNFTUrl: (data)=> {
        dispatch({type: types.createNFT.SET_URL, payload: data})
    },
    setTokenName: (data)=> {
        dispatch({type: types.token.SET_NAME, payload: data})
    },
    setTokenSymbol: (data)=> {
        dispatch({type: types.token.SET_SYMBOL, payload: data})
    },
    setCollateralType: (data)=> {
        dispatch({type: types.collateralAndPrice.SET_COLLATERAL, payload: data })
    },
    setInitialPrice: (data)=> {
        dispatch({type: types.collateralAndPrice.SET_PRICE, payload: data })
    },
    setCurve: (data)=> {
        dispatch({type: types.curve.SET_CURVE, payload: data})
    },
    setRiskProfile: (data)=> {
        dispatch({type: types.riskProfile.SET_RISK, payload: data})
    },
    setProvider: (data)=> {
        dispatch({type: types.provider.SET_PROVIDER, payload: data})
    },
    createMarket: (data)=> {
        dispatch({type: types.createMarket.CREATE_MARKET_PENDING})
        dispatch({type: types.createMarket.CREATE_MARKET_REQUEST, payload: data})
    }

})