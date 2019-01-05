import { SALE_ITEM_ADD_MESSAGE, REQUEST_ITEM_ADD_MESSAGE } from '../constants/action-types';
const appMessages = (state = [], action) => {
    switch (action.type) {
        case SALE_ITEM_ADD_MESSAGE:
            return { ...state, saleItemMessage: action.payload };
        case REQUEST_ITEM_ADD_MESSAGE:
            return { ...state, saleItemMessage: action.payload };
        default:
            return state
    }
}
export default appMessages;