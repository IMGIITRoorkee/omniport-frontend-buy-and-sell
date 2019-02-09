import { connect } from 'react-redux'
import Component from './renderer'
import { getSaleItemDetail } from '../../actions'
import { GET_SALE_ITEM_DETAIL } from '../../constants/action-types'

function mapStateToProps (state) {
  return {
    saleItemDetail: state.saleItemDetail,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSaleItemDetail: param => {
      dispatch(getSaleItemDetail(param))
    },
    clearSaleItem: () => {
      dispatch({
        type: GET_SALE_ITEM_DETAIL,
        payload: {}
      })
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
