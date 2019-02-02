import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import PRoute from 'services/auth/pRoute'
import { whoami } from 'services/auth/src/actions'

import App from './components/app'
import rootReducers from './reducers'

@connect(
  null,
  { whoami }
)
export default class AppRouter extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(rootReducers, applyMiddleware(thunk))
  }

  componentDidMount() {
    this.props.whoami()
  }

  render() {
    const { match, history } = this.props
    return (
      <Provider store={this.store}>
        <PRoute history={history} path={`${match.path}/`} component={App} />
      </Provider>
    )
  }
}
