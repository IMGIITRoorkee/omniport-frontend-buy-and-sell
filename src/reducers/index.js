import { combineReducers } from 'redux'
import SaleItems from './sale-items'
import RequestItems from './request-items'
import Categories from './categories'
import PaymentModes from './payment-modes'
import Constants from './constants'
import saleItemDetail from './sale-item-detail'
import requestItemDetail from './request-item-detail'
import getUser from './get-user'
import setItemType from './set-item-type'
import { setCategory, setSubCategory } from './set-category'
import requestForm from './request-form'
import saleForm from './sale-form'
import sortingOrder from './set-sort-order'
import { saleProductCount, requestProductCount } from './count'
import searchProducts from './search-products'
import userProducts from './user-products'
import pageNo from './page-no'
import appMessages from './app-messages'
import loaders from './loaders'
import searchFocus from './search-focus'
import { setFilter } from './set-filter'

const rootReducer = combineReducers({
  saleItems: SaleItems,
  requestItems: RequestItems,
  categories: Categories,
  paymentModes: PaymentModes,
  constants: Constants,
  saleItemDetail: saleItemDetail,
  requestItemDetail: requestItemDetail,
  user: getUser,
  itemType: setItemType,
  activeCategory: setCategory,
  activeSubCategory: setSubCategory,
  requestForm: requestForm,
  saleForm: saleForm,
  requestProductCount: requestProductCount,
  saleProductCount: saleProductCount,
  searchProducts: searchProducts,
  userProducts: userProducts,
  pageNo: pageNo,
  appMessages: appMessages,
  loaders: loaders,
  searchFocus: searchFocus,
  sortingOrder: sortingOrder,
  activeFilter: setFilter,
})
export default rootReducer
