import { SALE_PRODUCT_COUNT, REQUEST_PRODUCT_COUNT } from '../constants';
export const saleProductCount = (state = 0, action) => {
    switch (action.type) {
        case SALE_PRODUCT_COUNT:
            return action.payload;
        default:
            return state
    }
}
export const requestProductCount = (state = 0, action) => {
    switch (action.type) {
        case REQUEST_PRODUCT_COUNT:
            return action.payload;
        default:
            return state
    }
}
