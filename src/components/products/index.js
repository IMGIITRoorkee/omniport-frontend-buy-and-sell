import { connect } from 'react-redux'
import {
  getRequestItems,
  getSaleItems,
  setCategory,
  setPageNo,
  setSubCategory
} from '../../actions'
import Component from './renderer'

function mapStateToProps (state) {
  return {
    activeCategory: state.activeCategory,
    activeSubCategory: state.activeSubCategory,
    categories: state.categories,
    itemType: state.itemType,
    searchFocus: state.searchFocus,
    activeFilter: state.activeFilter
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSaleItems: (param1, param2, page, replace) => {
      dispatch(getSaleItems(param1, param2, page, replace))
    },
    getRequestItems: param => {
      dispatch(getRequestItems(param))
    },
    setCategory: param => {
      dispatch(setCategory(param))
    },
    setSubCategory: param => {
      dispatch(setSubCategory(param))
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
