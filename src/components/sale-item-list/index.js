import { connect } from 'react-redux'
import { getSaleItems, sortSaleItems, setItemType } from '../../actions';
import Component from './renderer';

function mapStateToProps(state) {
    return {
        saleItems: state.saleItems,
        subCategory: state.activeSubCategory,
        saleProductCount: state.saleProductCount
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getSaleItems: (param, page, replace) => {
            dispatch(getSaleItems(param, page, replace));
        },
        sortItems: (items) => {
            dispatch(sortSaleItems(items))
        },
        setItemType: (param) => {
            dispatch(setItemType(param))
        }

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);