import { connect } from 'react-redux'
import { getSearchProducts } from '../../actions'

import Component from './renderer'

function mapStateToProps(state) {
    return {
        searchProducts: state.searchProducts.slice()
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getSearchProducts: (query) => {
            dispatch(getSearchProducts(query));
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);