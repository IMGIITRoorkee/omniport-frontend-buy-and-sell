import {
  SALE_ITEM_ADD_MESSAGE,
  REQUEST_ITEM_ADD_MESSAGE
} from '../constants/action-types'

let initialState = {
  saleItemMessage: {
    value: '',
    status: null
  },
  requestItemMessage: {
    value: '',
    status: null
  }
}
const appMessages = (state = initialState, action) => {
  switch (action.type) {
    case SALE_ITEM_ADD_MESSAGE:
      return {
        ...state,
        saleItemMessage: {
          value: action.payload.value,
          status: action.payload.status
        }
      }
    case REQUEST_ITEM_ADD_MESSAGE:
      return {
        ...state,
        requestItemMessage: {
          value: action.payload.value,
          status: action.payload.status
        }
      }
    default:
      return state
  }
}
export default appMessages
