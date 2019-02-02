import axios from 'axios'

import { whoAmIUrl, GET_USER } from '../constants'

export const getUser = () => {
  return dispatch => {
    axios
      .get(whoAmIUrl)
      .then(res => {
        dispatch({
          type: GET_USER,
          payload: res.data
        })
      })
      .catch(err => {})
  }
}
