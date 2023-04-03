import { SET_FILTER } from '../constants/action-types'

export const setFilter = param => {
    return dispatch => {
      dispatch({
        type: SET_FILTER,
        payload: param
      })
    }
  }