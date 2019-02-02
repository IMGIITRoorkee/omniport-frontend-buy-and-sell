import { connect } from 'react-redux'

import Component from './renderer'

function mapStateToProps (state) {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
