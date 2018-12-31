import axios from 'axios';
import { requestProductUrl } from '../constants/urls';
import { getCookie } from 'formula_one/src/utils'


export  const addRequestItem = (data) => {
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
        })
    }
}