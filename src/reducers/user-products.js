import { GET_USER_REQUEST_PRODUCTS, DELETE_REQUEST_ITEM, DELETE_SALE_ITEM, GET_USER_SALE_PRODUCTS } from '../constants';

const initialState = {
    sale: [],
    request: []
}
const userProducts = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST_PRODUCTS:
            return { ...state, request: action.payload };
        case GET_USER_SALE_PRODUCTS:
            return { ...state, sale: action.payload };
        case DELETE_REQUEST_ITEM:
            return { ...state, request: state.request.filter(x => { return x.id !== action.payload }) }
        case DELETE_SALE_ITEM:
            return { ...state, sale: state.sale.filter(x => { return x.id !== action.payload }) }
        default:
            return state
    }
}
export default userProducts;