import axios from 'axios'
import { constantsUrl } from '../constants/urls'
import { GET_CONSTANTS } from '../constants/action-types'

export const getConstants = () => {
  return dispatch => {
    axios({
      method: 'get',
      url: constantsUrl,
      params: {}
    })
      .then(response => {
        dispatch({
          type: GET_CONSTANTS,
          payload: response.data
        })
      })
      .catch(error => {})
  }
}
