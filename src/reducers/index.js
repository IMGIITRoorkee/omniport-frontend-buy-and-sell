import { combineReducers } from 'redux';
import SaleItems from './SaleItems'
import Categories from './Categories'
import PaymentModes from './PaymentModes'
import saleItemDetail from './saleItemDetail'
import getUser from './get-user'
const rootReducer = combineReducers({
    saleItems: SaleItems,
    categories: Categories,
    paymentModes: PaymentModes,
    saleItemDetail: saleItemDetail,
    user: getUser,
})
export default rootReducer;