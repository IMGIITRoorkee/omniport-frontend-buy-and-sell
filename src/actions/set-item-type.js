import { SET_ITEM_TYPE } from '../constants/action-types';

export const setItemType = (param) => {
    return dispatch => {
        dispatch({
            type: SET_ITEM_TYPE,
            payload: param
        })
    }
}