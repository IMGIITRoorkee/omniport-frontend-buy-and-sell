import { connect } from 'react-redux'
import { getRequestItems, sortRequestItems, setItemType } from '../../actions';
import Component from './renderer';

function mapStateToProps(state) {
    return {
        requestItems: state.requestItems,
        subCategory: state.activeSubCategory
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getRequestItems: (param) => {
            dispatch(getRequestItems(param));
        },
        sortItems: (items) => {
            dispatch(sortRequestItems(items))
        },
        setItemType: (param) => {
            dispatch(setItemType(param))
        }

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);