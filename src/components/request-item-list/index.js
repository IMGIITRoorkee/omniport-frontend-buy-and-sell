import { connect } from 'react-redux'
import {
  getRequestItems,
  sortRequestItems,
  deleteItem,
  setItemType,
  setPageNo
} from '../../actions'
import Component from './renderer'

function mapStateToProps (state) {
  return {
    requestItems: state.requestItems,
    activeSubCategory: state.activeSubCategory,
    requestProductCount: state.requestProductCount,
    page: state.pageNo.request,
    user: state.user,
    loading: state.loaders.requestList
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getRequestItems: (param, page, replace) => {
      dispatch(getRequestItems(param, page, replace))
    },
    sortItems: items => {
      dispatch(sortRequestItems(items))
    },
    setItemType: param => {
      dispatch(setItemType(param))
    },
    setPageNo: (type, no) => {
      dispatch(setPageNo(type, no))
    },
    deleteItem: (id, type) => {
      dispatch(deleteItem(id, type))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
