import axios from 'axios'
import { requestProductUrl } from '../constants/urls'
import { getCookie } from 'formula_one/src/utils'
import { toast } from 'react-semantic-toasts'
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
        toast({
          type: 'success',
          title: 'Item updated succesfully',
          animation: 'fade up',
          icon: 'smile outline',
          time: 4000
        })
        dispatch({
          type: UPDATE_REQUEST_ITEM,
          payload: res.data
        })
      })
      .catch(err => {
        toast({
          type: 'error',
          title: 'Error occured, please try again',
          description: err.response.data.error,
          animation: 'fade up',
          icon: 'frown outline',
          time: 4000
        })
      })
  }
}
