import axios from 'axios';
import { saleItemUrl, requestItemUrl } from '../constants/urls';
import { GET_USER_REQUEST_PRODUCTS, GET_USER_SALE_PRODUCTS } from '../constants/action-types';

export const getUserSaleItems = () => {
    return dispatch => {
        axios({
            method: 'get',
            url: saleItemUrl + 'my_products',
            params: {
            },
        }).then((response) => {
            dispatch({
                type: GET_USER_SALE_PRODUCTS,
                payload: response.data.results
            })
        }).catch(error => {
            ;
        });
    }
}

export const getUserRequestItems = () => {
    return dispatch => {
        axios({
            method: 'get',
            url: requestItemUrl + 'my_products',
            params: {
            },
        }).then((response) => {
            dispatch({
                type: GET_USER_REQUEST_PRODUCTS,
                payload: response.data.results
            })
        }).catch(error => {
            ;
        });
    }
}