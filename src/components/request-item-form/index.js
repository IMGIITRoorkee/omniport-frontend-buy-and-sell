import { connect } from 'react-redux'
import Component from './renderer';
import { addRequestItem, updateRequestItem } from '../../actions';

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
        updateRequestItem: (data, id) => {
            dispatch(updateRequestItem(data, id))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);