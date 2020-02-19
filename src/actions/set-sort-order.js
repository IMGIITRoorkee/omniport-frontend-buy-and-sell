import { SORTING_ORDER } from '../constants/action-types'


export const setSortingOrder = order => {
    return {
      type: SORTING_ORDER,
      payload: order,
    }
  }