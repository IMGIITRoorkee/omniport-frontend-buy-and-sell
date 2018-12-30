import axios from 'axios';
import { requestProductUrl } from '../constants/urls';
import { GET_REQUEST_ITEM_DETAIL } from '../constants/action-types';

export const getRequestItemDetail = (param) => {
    return dispatch => {
        axios({
            method: 'get',
            url: requestProductUrl + param,
            params: {
            },
        }).then((response) => {
            let item = response.data;
            dispatch({
                type: GET_REQUEST_ITEM_DETAIL,
                payload: item
            })
        }).catch(error => {
            ;
        });
    }
}