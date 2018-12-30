import { GET_CATEGORIES } from '../constants/action-types';
const Categories = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload;
    default:
      return state
  }
}
export default Categories;