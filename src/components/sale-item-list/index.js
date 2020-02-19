import { connect } from 'react-redux'
import {
  getSaleItems,
  sortSaleItems,
  setItemType,
  setPageNo,
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
    sortingOrder: state.sortingOrder
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSaleItems: (param, page, replace) => {
      dispatch(getSaleItems(param, page, replace))
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
    setSortingOrder: (order) => {
      dispatch(setSortingOrder(order))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
