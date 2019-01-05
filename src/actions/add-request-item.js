import axios from 'axios';
import { requestProductUrl } from '../constants/urls';
import { REQUEST_ITEM_ADD_MESSAGE } from '../constants/action-types';

import { getCookie } from 'formula_one/src/utils'


export const addRequestItem = (data) => {
    let headers = {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': getCookie('csrftoken')
    }
    return dispatch => {
        axios.post(
            requestProductUrl,
            data,
            { headers: headers }
        ).then(res => {
            const response = {
                messageType: 'success',
                value: 'Your item has been added to Requested items.'
            }
            dispatch({
                type: REQUEST_ITEM_ADD_MESSAGE,
                payload: response
            })
        }).catch((error) => {
            const response = {
                messageType: 'negative',
                value: 'Sorry. There has been an error. Please try again!'
            }
            dispatch({
                type: REQUEST_ITEM_ADD_MESSAGE,
                payload: response
            })
        })
    }
}