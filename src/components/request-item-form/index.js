import { connect } from 'react-redux'
import Component from './renderer';
import { addRequestItem } from '../../actions';

function mapStateToProps(state) {
    return {
        categories: state.categories,
        user: state.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addRequestItem: (param) => {
            dispatch(addRequestItem(param));
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);