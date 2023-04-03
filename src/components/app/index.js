import { connect } from 'react-redux'
import Component from './renderer'
import { getCategories, getUser, getConstants } from '../../actions'

function mapStateToProps (state) {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => {
      dispatch(getCategories())
    },
    getUser: () => {
      dispatch(getUser())
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
