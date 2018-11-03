import { connect } from 'react-redux'
import App from './renderer'
import { getCategories } from '../../actions';

function mapStateToProps(state) {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getCategories: () => {
            dispatch(getCategories());
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);