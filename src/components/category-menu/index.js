import { connect } from 'react-redux'
import { getSaleItems } from '../../actions';
import CategoryMenu from './renderer'

function mapStateToProps(state) {
    return {
        categories: state.categories
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getSaleItems: (param) => {
            dispatch(getSaleItems(param));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);