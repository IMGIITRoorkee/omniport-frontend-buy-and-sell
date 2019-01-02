import { connect } from 'react-redux'
import { getUserRequestItems, getUserSaleItems } from '../../actions';
import Component from './renderer';

function mapStateToProps(state) {
    return {
        userProducts: state.userProducts
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getRequestItems: () => {
            dispatch(getUserRequestItems());
        },
        getSaleItems: () => {
            dispatch(getUserSaleItems());
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);