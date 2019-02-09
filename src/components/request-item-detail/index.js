import { connect } from 'react-redux'
import Component from './renderer'
import { getRequestItemDetail } from '../../actions'
import { GET_REQUEST_ITEM_DETAIL } from '../../constants/action-types'
function mapStateToProps (state) {
  return {
    requestItemDetail: state.requestItemDetail,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getRequestItemDetail: param => {
      dispatch(getRequestItemDetail(param))
    },
    clearRequestItem: () => {
      dispatch({
        type: GET_REQUEST_ITEM_DETAIL,
        payload: {}
      })
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
