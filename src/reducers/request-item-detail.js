import { GET_REQUEST_ITEM_DETAIL } from '../constants/action-types'
const requestItemDetail = (state = {}, action) => {
  switch (action.type) {
    case GET_REQUEST_ITEM_DETAIL:
      return action.payload
    default:
      return state
  }
}
export default requestItemDetail
