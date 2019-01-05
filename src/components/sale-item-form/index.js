import { connect } from 'react-redux'
import { getPayment, addSaleItem, updateSaleItem } from '../../actions';
import SaleItemForm from './renderer';

function mapStateToProps(state) {
    return {
        categories: state.categories,
        user: state.user,
        paymentModes: state.paymentModes
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getPayment: () => {
            dispatch(getPayment());
        },
        addSaleItem: (data, pictures) => {
            dispatch(addSaleItem(data, pictures));
        },
        updateSaleItem: (data, id) => {
            dispatch(updateSaleItem(data, id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SaleItemForm);