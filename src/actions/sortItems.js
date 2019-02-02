import { SORT_REQUEST_ITEMS, SORT_SALE_ITEMS } from '../constants/action-types'

export const sortSaleItems = items => {
  return {
    type: SORT_SALE_ITEMS,
    payload: items
  }
}
export const sortRequestItems = items => {
  return {
    type: SORT_REQUEST_ITEMS,
    payload: items
  }
}
