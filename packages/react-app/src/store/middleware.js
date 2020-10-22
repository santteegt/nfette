import types from "./types";
import createMarket from "../services/createMarket";

const applyMiddleware = (dispatch) => (action)=> {
    switch (action.type) {
        case types.createMarket.CREATE_MARKET_REQUEST:
            return createMarket(action.payload)
            .then(res=> {
                dispatch({
                    type: types.createMarket.CREATE_MARKET_SUCCESS,
                    payload: res
                })
            }).catch(error=> {
                dispatch({
                    type: types.createMarket.CREATE_MARKET_FAIL,
                    payload: error
                })
            })
            default: 
            dispatch(action);
    }
}

export default applyMiddleware;