import { connect } from 'react-redux'
import { getUserRequestItems, getUserSaleItems, changePhoneStatus } from '../../actions';
import Component from './renderer';

function mapStateToProps(state) {
    return {
        userProducts: state.userProducts,
        categories: state.categories,
        user: state.user
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
        changePhoneStatus: (data) => {
            dispatch(changePhoneStatus(data));
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);