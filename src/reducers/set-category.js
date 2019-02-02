import { SET_CATEGORY, SET_SUB_CATEGORY } from '../constants/action-types'
export const setCategory = (state = '', action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return action.payload
    default:
      return state
  }
}

export const setSubCategory = (state = '', action) => {
  switch (action.type) {
    case SET_SUB_CATEGORY:
      return action.payload
    default:
      return state
  }
}
