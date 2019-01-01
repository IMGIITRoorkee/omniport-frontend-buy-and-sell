import axios from 'axios';
import { saleItemUrl } from '../constants/urls';
import { GET_SALE_ITEMS, UPDATE_SALE_ITEMS, SALE_PRODUCT_COUNT } from '../constants/action-types';

export const getSaleItems = (param, page = 1, replace = false) => {
    return dispatch => {
        axios({
            method: 'get',
            url: saleItemUrl + param,
            params: {
                page: page
            },
        }).then((response) => {
            let itemsNewList = response.data.results;
            if (replace) {
                dispatch({
                    type: UPDATE_SALE_ITEMS,
                    payload: itemsNewList
                })
            }
            else {
                dispatch({
                    type: GET_SALE_ITEMS,
                    payload: itemsNewList
                })
            }
            dispatch({
                type: SALE_PRODUCT_COUNT,
                payload: response.data.count
            })
        }).catch(error => {
            ;
        });
    }
}