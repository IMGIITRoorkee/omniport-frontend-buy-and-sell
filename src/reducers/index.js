import { combineReducers } from 'redux';
import getSaleItems from './getSaleItems'
const rootReducer = combineReducers({
    saleItems: getSaleItems,

})
export default rootReducer;