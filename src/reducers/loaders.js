import {
  SET_SALE_LIST_LOADER,
  SET_REQUEST_LIST_LOADER,
  SET_USER_REQUEST_LIST_LOADER,
  SET_USER_SALE_LIST_LOADER
} from '../constants/action-types'

const initialState = {
  saleList: true,
  requestList: true,
  userSaleList: true,
  userRequestList: true
}

const loaders = (state = initialState, action) => {
  switch (action.type) {
    case SET_SALE_LIST_LOADER:
      return { ...state, saleList: action.payload }
    case SET_REQUEST_LIST_LOADER:
      return { ...state, requestList: action.payload }
    case SET_USER_SALE_LIST_LOADER:
      return { ...state, userSaleList: action.payload }
    case SET_USER_REQUEST_LIST_LOADER:
      return { ...state, userRequestList: action.payload }

    default:
      return state
  }
}
export default loaders
