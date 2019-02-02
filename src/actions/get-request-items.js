import axios from 'axios'
import { requestItemUrl } from '../constants/urls'
import {
  GET_REQUEST_ITEMS,
  UPDATE_REQUEST_ITEMS,
  REQUEST_PRODUCT_COUNT
} from '../constants/action-types'

export const getRequestItems = (param, page = 1, replace = false) => {
  return dispatch => {
    axios({
      method: 'get',
      url: requestItemUrl + param,
      params: {
        page: page
      }
    })
      .then(response => {
        let itemsNewList = response.data.results
        if (replace) {
          dispatch({
            type: GET_REQUEST_ITEMS,
            payload: itemsNewList
          })
        } else {
          dispatch({
            type: UPDATE_REQUEST_ITEMS,
            payload: itemsNewList
          })
        }
        dispatch({
          type: REQUEST_PRODUCT_COUNT,
          payload: response.data.count
        })
      })
      .catch(error => {})
  }
}
