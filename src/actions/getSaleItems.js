import axios from 'axios';
import { saleItemUrl } from '../constants/urls';
import { GET_SALE_ITEMS } from '../constants/action-types';

export const getSaleItems = () => {
    return dispatch => {
        axios({
            method: 'get',
            url: saleItemUrl,
            params: {
            },
        }).then((response) => {
            dispatch({
                type: GET_SALE_ITEMS,
                payload: response.data.results
            })
        }).catch(error => {
            ;
        });
    }
}