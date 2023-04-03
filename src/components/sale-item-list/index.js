import { connect } from 'react-redux'
import {
  getSaleItems,
  sortSaleItems,
  setItemType,
  setPageNo,
  setFilter,
  setSortingOrder,
} from '../../actions'
import Component from './renderer'

function mapStateToProps (state) {
  return {
    saleItems: state.saleItems,
    activeSubCategory: state.activeSubCategory,
    saleProductCount: state.saleProductCount,
    page: state.pageNo.sale,
    loading: state.loaders.saleList,
    sortingOrder: state.sortingOrder,
    activeFilter: state.activeFilter
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSaleItems: (param1, param2, page, replace) => {
      dispatch(getSaleItems(param1, param2, page, replace))
    },
    sortItems: items => {
      dispatch(sortSaleItems(items))
    },
    setItemType: param => {
      dispatch(setItemType(param))
    },
    setPageNo: (type, no) => {
      dispatch(setPageNo(type, no))
    },
    setFilter: param => {
      dispatch(setFilter(param))
    },
    setSortingOrder: (order) => {
      dispatch(setSortingOrder(order))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
