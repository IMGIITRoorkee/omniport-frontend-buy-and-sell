import { combineReducers } from 'redux';
import SaleItems from './SaleItems'
import Categories from './Categories'
import PaymentModes from './PaymentModes'
import saleItemDetail from './saleItemDetail'
const rootReducer = combineReducers({
    saleItems: SaleItems,
    categories:Categories,
    paymentModes:PaymentModes,
    saleItemDetail:saleItemDetail


})
export default rootReducer;