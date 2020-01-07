import axios from 'axios'
import { requestProductUrl } from '../constants/urls'
import { REQUEST_ITEM_ADD_MESSAGE } from '../constants/action-types'

import { toast } from 'react-semantic-toasts'

import { getCookie } from 'formula_one/src/utils'

export const addRequestItem = data => {
  let headers = {
    'Content-Type': 'multipart/form-data',
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    axios
      .post(requestProductUrl, data, { headers: headers })
      .then(res => {
        const response = {
          status: true,
          value:
            'Congratulations! Your item has been added to Requested items.'
        }
        toast({
          type: 'success',
          title: 'Item added succesfully',
          animation: 'fade up',
          icon: 'smile outline',
          time: 4000
        })
        dispatch({
          type: REQUEST_ITEM_ADD_MESSAGE,
          payload: response
        })
      })
      .catch(err => {
        const response = {
          value: 'Sorry! There has been an error. Please try again!',
          status: false
        }
        toast({
          type: 'error',
          title: 'Error occured.Try again',
          description: err.response.data.error,
          animation: 'fade up',
          icon: 'frown outline',
          time: 4000
        })
        dispatch({
          type: REQUEST_ITEM_ADD_MESSAGE,
          payload: response
        })
      })
  }
}
