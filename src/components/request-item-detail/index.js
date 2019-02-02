import { connect } from 'react-redux'
import Component from './renderer'
import { getRequestItemDetail } from '../../actions'

function mapStateToProps (state) {
  return {
    requestItemDetail: state.requestItemDetail
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getRequestItemDetail: param => {
      dispatch(getRequestItemDetail(param))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
