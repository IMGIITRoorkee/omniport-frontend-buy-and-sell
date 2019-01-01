import { connect } from 'react-redux'
import { getRequestItems, sortRequestItems, setItemType } from '../../actions';
import Component from './renderer';

function mapStateToProps(state) {
    return {
        requestItems: state.requestItems,
        activeSubCategory: state.activeSubCategory,
        requestProductCount: state.requestProductCount
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getRequestItems: (param, page, replace) => {
            dispatch(getRequestItems(param, page, replace));
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