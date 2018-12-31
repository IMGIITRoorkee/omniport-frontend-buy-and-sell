import { SET_SALE_FORM } from '../constants/action-types';
const saleForm = (state = [], action) => {
  switch (action.type) {
    case SET_SALE_FORM:
      return action.payload;
    default:
      return state
  }
}
export default saleForm;