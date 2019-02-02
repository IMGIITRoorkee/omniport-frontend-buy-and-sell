import { SET_REQUEST_FORM } from '../constants/action-types'
const initialState = {
  endDate: '',
  name: '',
  category: '5',
  cost: '',
  phoneVisibility: false
}
const requestForm = (state = initialState, action) => {
  switch (action.type) {
    case SET_REQUEST_FORM:
      return action.payload
    default:
      return state
  }
}
export default requestForm
