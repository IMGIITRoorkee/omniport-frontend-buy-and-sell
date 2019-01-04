import axios from 'axios';
import { whoAmIUrl } from '../constants/urls';
import { getCookie } from 'formula_one/src/utils'


export const changePhoneStatus = (data) => {
    let headers = {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': getCookie('csrftoken')
    }
    return dispatch => {
        axios({
            method: 'post',
            url: whoAmIUrl,
            headers: headers,
            data: data
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error.response.data);
        });
    }
}