import axios from 'axios';
import { categoriesUrl } from '../constants/urls';
import { GET_CATEGORIES } from '../constants/action-types';

export const getCategories = () => {
    return dispatch => {
        axios({
            method: 'get',
            url: categoriesUrl,
            params: {
            },
        }).then((response) => {
            dispatch({
                type: GET_CATEGORIES,
                payload: response.data.results
            })
        }).catch(error => {
            ;
        });
    }
}