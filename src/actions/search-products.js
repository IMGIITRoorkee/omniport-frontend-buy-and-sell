import axios from 'axios';
import { searchUrl } from '../constants/urls';
import { SEARCH_PRODUCTS } from '../constants/action-types';

export const getSearchProducts = (query) => {
    return dispatch => {
        axios({
            method: 'get',
            url: searchUrl,
            params: {
                query: query
            },
        }).then((response) => {
            console.log(response.data.results.slice())
            dispatch({
                type: SEARCH_PRODUCTS,
                payload: response.data.results.slice()
            })
        }).catch(error => {
            ;
        });
    }
}