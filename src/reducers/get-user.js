import { GET_USER } from '../constants';
const getUser = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    default:
      return state
  }
}
export default getUser;