import { connect } from 'react-redux'
import { getSaleItems } from '../../actions';
import ItemList from './renderer';

function mapStateToProps(state) {
    return {
        saleItems : state.saleItems
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getSaleItems: () => {
            dispatch(getSaleItems());
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);