import { SET_SUB_CATEGORY, SET_CATEGORY } from '../constants/action-types';

export const setCategory = (param) => {
    return dispatch => {
        dispatch({
            type: SET_CATEGORY,
            payload: param
        })
    }
}
export const setSubCategory = (param) => {
    return dispatch => {
        dispatch({
            type: SET_SUB_CATEGORY,
            payload: param
        })
    }
}