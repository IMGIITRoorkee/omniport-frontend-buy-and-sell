import { connect } from 'react-redux'
import { getRequestItems, sortRequestItems, deleteItem, setItemType, setPageNo } from '../../actions';
import Component from './renderer';

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteItem: (id, type) => {
            dispatch(deleteItem(id, type))
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);