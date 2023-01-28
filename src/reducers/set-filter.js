import { SET_FILTER } from '../constants/action-types'
export const setFilter = (state = '', action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload
    default:
      return state
  }
}