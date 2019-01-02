import { GET_REQUEST_ITEMS, DELETE_REQUEST_ITEM, UPDATE_REQUEST_ITEMS, SORT_REQUEST_ITEMS } from '../constants/action-types';
const requestItems = (state = [], action) => {
    switch (action.type) {
        case UPDATE_REQUEST_ITEMS:
            return [...state, ...action.payload];
        case GET_REQUEST_ITEMS:
            return action.payload
        case SORT_REQUEST_ITEMS:
            return action.payload;
        case DELETE_REQUEST_ITEM:
            return state.filter(x => {return x.id !== action.payload})
        default:
            return state
    }
}
export default requestItems;