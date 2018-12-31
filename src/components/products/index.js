import { connect } from 'react-redux'
import { getRequestItems, getSaleItems, setCategory, setSubCategory } from '../../actions'
import Component from './renderer'

function mapStateToProps(state) {
    return {
        activeCategory: state.activeCategory,
        activeSubCategory: state.activeSubCategory,
        categories: state.categories,
        itemType: state.itemType
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getSaleItems: (param) => {
            dispatch(getSaleItems(param));
        },
        getRequestItems: (param) => {
            dispatch(getRequestItems(param));
        },
        setCategory: (param) => {
            dispatch(setCategory(param));
        },
        setSubCategory: (param) => {
            dispatch(setSubCategory(param));
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);