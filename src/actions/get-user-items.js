import axios from 'axios'
import { saleItemUrl, requestItemUrl } from '../constants/urls'
import {
  GET_USER_REQUEST_PRODUCTS,
  GET_USER_SALE_PRODUCTS,
  UPDATE_USER_REQUEST_PRODUCTS,
  UPDATE_USER_SALE_PRODUCTS,
  USER_REQUEST_PRODUCTS_COUNT,
  USER_SALE_PRODUCTS_COUNT
} from '../constants/action-types'

export const getUserSaleItems = (page = 1, replace = false) => {
  return dispatch => {
    axios({
      method: 'get',
      url: saleItemUrl + 'my_products/',
      params: {
        page: page
      }
    })
      .then(response => {
        if (!replace) {
          dispatch({
            type: UPDATE_USER_SALE_PRODUCTS,
            payload: response.data.results
          })
        } else {
          dispatch({
            type: GET_USER_SALE_PRODUCTS,
            payload: response.data.results
          })
        }
        dispatch({
          type: USER_SALE_PRODUCTS_COUNT,
          payload: response.data.count
        })
      })
      .catch(error => {})
  }
}

export const getUserRequestItems = (page = 1, replace = false) => {
  return dispatch => {
    axios({
      method: 'get',
      url: requestItemUrl + 'my_products/',
      params: {
        page: page
      }
    })
      .then(response => {
        if (!replace) {
          dispatch({
            type: UPDATE_USER_REQUEST_PRODUCTS,
            payload: response.data.results
          })
        } else {
          dispatch({
            type: GET_USER_REQUEST_PRODUCTS,
            payload: response.data.results
          })
        }
        dispatch({
          type: USER_REQUEST_PRODUCTS_COUNT,
          payload: response.data.count
        })
      })
      .catch(error => {})
  }
}
