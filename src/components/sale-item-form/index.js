import { connect } from 'react-redux'
import { getPayment,
         addSaleItem,
         updateSaleItem,
         setCategory,
         setSubCategory
         } from '../../actions'
import { SALE_ITEM_ADD_MESSAGE } from '../../constants'
import SaleItemForm from './renderer'

function mapStateToProps (state) {
  return {
    categories: state.categories,
    user: state.user,
    paymentModes: state.paymentModes,
    appMessages: state.appMessages,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getPayment: () => {
      dispatch(getPayment())
    },
    addSaleItem: (data, pictures) => {
      dispatch(addSaleItem(data, pictures))
    },
    setCategory: param => {
      dispatch(setCategory(param))
    },
    setSubCategory: param => {
      dispatch(setSubCategory(param))
    },
    updateSaleItem: (data, id) => {
      dispatch(updateSaleItem(data, id))
    },
    updateMessage: () => {
      dispatch({
        type: SALE_ITEM_ADD_MESSAGE,
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
)(SaleItemForm)
