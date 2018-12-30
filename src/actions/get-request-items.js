import axios from 'axios';
import { requestItemUrl } from '../constants/urls';
import { GET_REQUEST_ITEMS } from '../constants/action-types';

export const getRequestItems = (param) => {
    return dispatch => {
        axios({
            method: 'get',
            url: requestItemUrl + param,
            params: {
            },
        }).then((response) => {
            let itemsNewList = response.data.results;
            itemsNewList.sort((a, b) => {
                return new Date(b.datetimeCreated) - new Date(a.datetimeCreated)
            })
            dispatch({
                type: GET_REQUEST_ITEMS,
                payload: itemsNewList
            })
        }).catch(error => {
            ;
        });
    }
}