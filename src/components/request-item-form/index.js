import { connect } from 'react-redux'
import Component from './renderer'
import { addRequestItem, updateRequestItem } from '../../actions'
import { REQUEST_ITEM_ADD_MESSAGE } from '../../constants'

function mapStateToProps (state) {
  return {
    categories: state.categories,
    user: state.user,
    appMessages: state.appMessages,
    setCategory: state.setCategory,
    setSubCategory: state.setSubCategory,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addRequestItem: param => {
      dispatch(addRequestItem(param))
    },
    updateRequestItem: (data, id) => {
      dispatch(updateRequestItem(data, id))
    },
    setCategory: param => {
      dispatch(setCategory(param))
    },
    setSubCategory: param => {
      dispatch(setSubCategory(param))
    },
    updateMessage: () => {
      dispatch({
        type: REQUEST_ITEM_ADD_MESSAGE,
        payload: {
          value: '',
          status: null
        }
      })
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
