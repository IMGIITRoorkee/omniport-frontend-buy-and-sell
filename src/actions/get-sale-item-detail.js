import axios from 'axios'
import { saleProductUrl } from '../constants/urls'
import { GET_SALE_ITEM_DETAIL } from '../constants/action-types'

export const getSaleItemDetail = param => {
  return dispatch => {
    axios({
      method: 'get',
      url: saleProductUrl + param,
      params: {}
    })
      .then(response => {
        let item = response.data
        dispatch({
          type: GET_SALE_ITEM_DETAIL,
          payload: item
        })
      })
      .catch(error => {})
  }
}
