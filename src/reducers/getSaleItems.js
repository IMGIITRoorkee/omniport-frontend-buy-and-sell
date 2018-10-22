import { GET_SALE_ITEMS } from '../constants/action-types';
const getSaleItems = (state = [], action) => {
  switch (action.type) {
    case GET_SALE_ITEMS:
      return action.payload;
    default:
      return state
  }
}
export default getSaleItems;