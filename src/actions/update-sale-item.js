import axios from 'axios';
import { saleProductUrl } from '../constants/urls';
import { getCookie } from 'formula_one/src/utils'
import { UPDATE_SALE_ITEM } from '../constants';


export const updateSaleItem = (data, id) => {
    let headers = {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': getCookie('csrftoken')
    }
    return dispatch => {
        axios.patch(
            `${saleProductUrl}${id}/`,
            data,
            { headers: headers }
        ).then(res => {
            dispatch({
                type: UPDATE_SALE_ITEM,
                payload: res.data
            })
        })
    }
}