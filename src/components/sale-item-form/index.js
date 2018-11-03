import { connect } from 'react-redux'
import { getPayment } from '../../actions';
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SaleItemForm);