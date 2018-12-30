import { GET_SALE_ITEM_DETAIL } from '../constants/action-types';
const SaleItemDetail = (state = {}, action) => {
  switch (action.type) {
    case GET_SALE_ITEM_DETAIL:
      return action.payload;
    default:
      return state
  }
}
export default SaleItemDetail;