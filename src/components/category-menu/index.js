import { connect } from 'react-redux'
import {
  getSaleItems,
  getRequestItems,
  setCategory,
  setSubCategory,
  setPageNo
} from '../../actions'
import Component from './renderer'

function mapStateToProps (state) {
  return {
    categories: state.categories,
    itemType: state.itemType,
    activeCategory: state.activeCategory,
    activeSubCategory: state.activeSubCategory,
    activeFilter: state.activeFilter,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSaleItems: (param1, param2, page, replace) => {
      dispatch(getSaleItems(param1, param2, page, replace))
    },
    getRequestItems: (param, page, replace) => {
      dispatch(getRequestItems(param, page, replace))
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
