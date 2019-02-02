import { connect } from 'react-redux'
import Component from './renderer'
import { getSaleItemDetail } from '../../actions'

function mapStateToProps (state) {
  return {
    saleItemDetail: state.saleItemDetail
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSaleItemDetail: param => {
      dispatch(getSaleItemDetail(param))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
