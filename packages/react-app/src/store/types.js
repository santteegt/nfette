const types = {
    createNFT: {
        SET_NAME: "CREATE_NFT_SET_NAME",
        SET_SYMBOL: "CREATE_NFT_SET_SYMBOL",
        SET_URL: "CREATE_NFT_SET_URL"
    },
    collateralAndPrice: {
        SET_COLLATERAL: "COLLATERAL_AND_PRICE_SET_COLLATERAL",
        SET_PRICE: "COLLATERAL_AND_PRICE_SET_PRICE"
    },
    curve: {
        SET_CURVE: "CURVE_SET_CURVE",
    },
    riskProfile: {
        SET_RISK: "RISK_PROFILE_SET_RISK"
    },
    provider: {
        SET_PROVIDER: "SET_PROVIDER"
    },
    createMarket: {
        CREATE_MARKET_SUCCESS: "CREATE_MARKET_SUCCESS",
        CREATE_MARKET_FAIL: "CREATE_MARKET_FAIL",
        CREATE_MARKET_REQUEST: "CREATE_MARKET_REQUEST"
    }
}

export default types;