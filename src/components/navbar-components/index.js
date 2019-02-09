import { connect } from 'react-redux'
import { getSearchProducts } from '../../actions'
import { SET_SEARCH_FOCUS } from '../../constants/action-types'

import Component from './renderer'

function mapStateToProps (state) {
  return {
    searchProducts: state.searchProducts.slice()
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSearchProducts: query => {
      dispatch(getSearchProducts(query))
    },
    setSearchFocus: value => {
      dispatch({
        type: SET_SEARCH_FOCUS,
        payload: value
      })
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
