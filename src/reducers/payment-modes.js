import { GET_PAYMENT } from '../constants/action-types'
const PaymentModes = (state = [], action) => {
  switch (action.type) {
    case GET_PAYMENT:
      return action.payload
    default:
      return state
  }
}
export default PaymentModes
