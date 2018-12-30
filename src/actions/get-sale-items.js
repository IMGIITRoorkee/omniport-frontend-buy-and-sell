import axios from 'axios';
import { saleItemUrl } from '../constants/urls';
import { GET_SALE_ITEMS } from '../constants/action-types';

export const getSaleItems = (param) => {
    return dispatch => {
        axios({
            method: 'get',
            url: saleItemUrl + param,
            params: {
            },
        }).then((response) => {
            let itemsNewList = response.data.results;
            itemsNewList.sort((a, b) => {
                return new Date(b.datetimeCreated) - new Date(a.datetimeCreated)
            })
            dispatch({
                type: GET_SALE_ITEMS,
                payload: itemsNewList
            })
        }).catch(error => {
            ;
        });
    }
}