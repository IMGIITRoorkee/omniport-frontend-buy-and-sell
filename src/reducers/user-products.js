import { GET_USER_REQUEST_PRODUCTS, DELETE_REQUEST_ITEM, DELETE_SALE_ITEM, GET_USER_SALE_PRODUCTS, UPDATE_REQUEST_ITEM, UPDATE_SALE_ITEM } from '../constants';

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
        default:
            return state
    }
}
export default userProducts;