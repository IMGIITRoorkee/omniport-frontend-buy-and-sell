import { SET_ITEM_TYPE } from '../constants/action-types';
const setItemType = (state = '', action) => {
    switch (action.type) {
        case SET_ITEM_TYPE:
            return action.payload;
        default:
            return state
    }
}
export default setItemType;