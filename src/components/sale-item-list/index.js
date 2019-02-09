import { connect } from 'react-redux'
import {
  getSaleItems,
  sortSaleItems,
  setItemType,
  setPageNo
} from '../../actions'
import Component from './renderer'

function mapStateToProps (state) {
  return {
    saleItems: state.saleItems,
    activeSubCategory: state.activeSubCategory,
    saleProductCount: state.saleProductCount,
    page: state.pageNo.sale,
    loading: state.loaders.saleList
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
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
