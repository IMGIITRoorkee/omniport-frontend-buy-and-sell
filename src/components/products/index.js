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
    searchFocus: state.searchFocus
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSaleItems: param => {
      dispatch(getSaleItems(param))
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
