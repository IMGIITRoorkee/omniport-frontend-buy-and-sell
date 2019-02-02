import axios from 'axios'
import { requestProductUrl } from '../constants/urls'
import { getCookie } from 'formula_one/src/utils'
import { UPDATE_REQUEST_ITEM } from '../constants/action-types'

export const updateRequestItem = (data, id) => {
  let headers = {
    'Content-Type': 'multipart/form-data',
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    axios
      .patch(`${requestProductUrl}${id}/`, data, { headers: headers })
      .then(res => {
        dispatch({
          type: UPDATE_REQUEST_ITEM,
          payload: res.data
        })
      })
  }
}
