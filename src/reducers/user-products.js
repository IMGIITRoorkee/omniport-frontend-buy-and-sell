import {
    GET_USER_REQUEST_PRODUCTS,
    UPDATE_USER_SALE_PRODUCTS,
    UPDATE_USER_REQUEST_PRODUCTS,
    DELETE_REQUEST_ITEM,
    DELETE_SALE_ITEM,
    GET_USER_SALE_PRODUCTS,
    UPDATE_REQUEST_ITEM,
    UPDATE_SALE_ITEM,
    USER_REQUEST_PRODUCTS_COUNT,
    USER_SALE_PRODUCTS_COUNT
} from '../constants';

const initialState = {
    sale: [],
    request: [],
    saleCount: 0,
    requestCount: 0
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
        case UPDATE_REQUEST_ITEM:
            return {
                ...state, sale: state.sale.map(x => {
                    if (action.payload.id == x.id)
                        return action.payload
                    return x
                })
            }
        case UPDATE_SALE_ITEM:
            return {
                ...state, sale: state.sale.map(x => {
                    if (action.payload.id == x.id)
                        return action.payload
                    return x
                })
            }
        case UPDATE_USER_REQUEST_PRODUCTS:
            return { ...state, request: [...state.sale, ...action.payload] };
        case UPDATE_USER_SALE_PRODUCTS:
            return { ...state, sale: [...state.sale, ...action.payload] };
        case USER_SALE_PRODUCTS_COUNT:
            return { ...state, saleCount: action.payload }
        case USER_REQUEST_PRODUCTS_COUNT:
            return { ...state, requestCount: action.payload }
        default:
            return state
    }
}
export default userProducts;