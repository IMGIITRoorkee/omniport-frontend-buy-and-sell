import { SET_SALE_PAGE, SET_REQUEST_PAGE } from '../constants';

const initialState = {
    sale: 1,
    request: 1
}
const pageNo = (state = initialState, action) => {
    switch (action.type) {
        case SET_SALE_PAGE:
            return { ...state, sale: action.payload };
        case SET_REQUEST_PAGE:
            return { ...state, request: action.payload };
        default:
            return state
    }
}
export default pageNo;