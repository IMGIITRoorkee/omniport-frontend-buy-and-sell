import {
  GET_SALE_ITEMS,
  UPDATE_SALE_ITEMS,
  DELETE_SALE_ITEM,
  UPDATE_SALE_ITEM,
  SORT_SALE_ITEMS
} from '../constants/action-types'

const SaleItems = (state = [], action) => {
  switch (action.type) {
    case GET_SALE_ITEMS:
      return action.payload
    case UPDATE_SALE_ITEMS:
      return [...state, ...action.payload]
    case SORT_SALE_ITEMS:
      return action.payload
    case DELETE_SALE_ITEM:
      return state.filter(x => {
        return x.id !== action.payload
      })
    case UPDATE_SALE_ITEM:
      return state.map(x => {
        if (action.payload.id === x.id) return action.payload
        return x
      })
    default:
      return state
  }
}
export default SaleItems
