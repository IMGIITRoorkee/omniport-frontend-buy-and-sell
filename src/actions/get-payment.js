import axios from 'axios';
import { paymentUrl } from '../constants/urls';
import { GET_PAYMENT } from '../constants/action-types';

export const getPayment = () => {
    return dispatch => {
        axios({
            method: 'get',
            url: paymentUrl,
            params: {
            },
        }).then((response) => {
            dispatch({
                type: GET_PAYMENT,
                payload: response.data.results
            })
        }).catch(error => {
            ;
        });
    }
}