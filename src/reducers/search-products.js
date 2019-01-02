import { SEARCH_PRODUCTS } from '../constants';
const searchProducts = (state = [], action) => {
  switch (action.type) {
    case SEARCH_PRODUCTS:
      return action.payload;
    default:
      return state
  }
}
export default searchProducts;