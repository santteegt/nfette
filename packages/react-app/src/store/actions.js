import types from './types';

export const useActions = (state, dispatch)=> ({
    clearNewNFTDetails: ()=> {
        dispatch({type: types.createNFT.PREVIOUS})
    },
    setNewNFTDetails: (data)=> {
        dispatch({type: types.createNFT.PROCEED, payload: data})
    },
    setImportedNFTDetails: (data)=> {
        dispatch({type: types.importNFT.PROCEED, payload: data})
    },
    clearImportedNFTDetails: ()=> {
        dispatch({type: types.importNFT.PREVIOUS})
    },
    setCurve: (data)=> {
        dispatch({type: types.chooseCurve.PROCEED, payload: data})
    },
    clearCurve: ()=> {
        dispatch({type: types.chooseCurve.PREVIOUS})
    },
    setRiskProfile: (data)=> {
        dispatch({type: types.riskProfile.PROCEED, payload: data})
    },
    clearRiskProfile: ()=> {
        dispatch({type: types.riskProfile.PREVIOUS})
    }
})