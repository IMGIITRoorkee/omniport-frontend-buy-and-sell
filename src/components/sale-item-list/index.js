import { connect } from 'react-redux'
import { getSaleItems , sortItems } from '../../actions';
import ItemList from './renderer';

function mapStateToProps(state) {
    return {
        saleItems : state.saleItems
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getSaleItems: (param) => {
            dispatch(getSaleItems(param));
        },
        sortItems: (items) => {
            dispatch(sortItems(items))
        }

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);