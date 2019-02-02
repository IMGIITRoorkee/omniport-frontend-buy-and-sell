import { connect } from 'react-redux'
import Component from './renderer'
import { deleteItem } from '../../actions'

function mapStateToProps (state) {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    deleteItem: (id, type) => {
      dispatch(deleteItem(id, type))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
