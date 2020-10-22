import types from "./types";

const reducer = (state, action)=> {
    switch (action.type) {
        case types.createNFT.PROCEED:
            return {...state, newNFTDetails: action.payload}
        case types.createNFT.PREVIOUS:
            return {...state, newNFTDetails: {}}
        case types.importNFT.PROCEED:
            return {...state, nftDetails: action.payload}
        case types.importNFT.PREVIOUS:
            return {...state, nftDetails: {}}
        case types.chooseCurve.PROCEED:
            return {...state, curveShape: action.payload}
        case types.chooseCurve.PREVIOUS:
            return {...state, curveShape: ""}
        case types.riskProfile.PROCEED:
            return {...state, riskProfile: action.payload}
        case types.riskProfile.PREVIOUS:
            return {...state, riskProfile: ""}
        default:
            return state
    }
}

export default reducer;