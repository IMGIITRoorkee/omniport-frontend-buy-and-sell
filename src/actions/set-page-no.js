import axios from 'axios'

import { SET_SALE_PAGE, SET_REQUEST_PAGE } from '../constants'

export const setPageNo = (itemType, no) => {
  if (itemType == 'sale') {
    return dispatch => {
      dispatch({
        type: SET_SALE_PAGE,
        payload: no
      })
    }
  } else if (itemType == 'request') {
    return dispatch => {
      dispatch({
        type: SET_REQUEST_PAGE,
        payload: no
      })
    }
  }
}
