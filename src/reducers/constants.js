
import { GET_CONSTANTS } from '../constants/action-types'

const Constants = (state = {}, action) => {
  switch (action.type) {
    case GET_CONSTANTS:
      return action.payload
    default:
      return state
  }
}

export default Constants