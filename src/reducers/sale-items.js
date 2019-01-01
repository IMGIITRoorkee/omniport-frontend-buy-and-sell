import { GET_SALE_ITEMS, UPDATE_SALE_ITEMS, SORT_SALE_ITEMS } from '../constants/action-types';
const SaleItems = (state = [], action) => {
  switch (action.type) {
    case GET_SALE_ITEMS:
      return action.payload;
    case UPDATE_SALE_ITEMS:
      return [...state, ...action.payload];
    case SORT_SALE_ITEMS:
      return action.payload;
    default:
      return state
  }
}
export default SaleItems;