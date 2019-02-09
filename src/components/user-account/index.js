import { connect } from 'react-redux'
import {
  getUserRequestItems,
  getUserSaleItems,
  changePhoneStatus
} from '../../actions'
import Component from './renderer'

function mapStateToProps (state) {
  return {
    userProducts: state.userProducts,
    categories: state.categories,
    user: state.user,
    loaders: state.loaders
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getRequestItems: (page, replace) => {
      dispatch(getUserRequestItems(page, replace))
    },
    getSaleItems: (page, replace) => {
      dispatch(getUserSaleItems(page, replace))
    },
    changePhoneStatus: data => {
      dispatch(changePhoneStatus(data))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
