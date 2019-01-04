import { connect } from 'react-redux'
import { getPayment, addSaleItem } from '../../actions';
import SaleItemForm from './renderer';

function mapStateToProps(state) {
    return {
        categories: state.categories,
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SaleItemForm);