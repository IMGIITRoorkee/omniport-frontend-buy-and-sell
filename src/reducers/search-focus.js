import { SET_SEARCH_FOCUS } from '../constants/action-types'

let initialState = false
const searchFocus = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_FOCUS:
      return action.payload
    default:
      return state
  }
}
export default searchFocus
