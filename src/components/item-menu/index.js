import { connect } from 'react-redux'
import Component from './renderer'
import { setItemType } from '../../actions'

function mapStateToProps (state) {
  return {
    itemType: state.itemType
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setItemType: param => {
      dispatch(setItemType(param))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
