import { SORTING_ORDER } from '../constants/action-types'
const sortingOrder = (state = 'latest', action) => {
  switch (action.type) {
    case SORTING_ORDER:
      return action.payload
    default:
      return state
  }
}
export default sortingOrder
