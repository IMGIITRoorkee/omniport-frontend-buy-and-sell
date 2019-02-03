import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'

import App from './components/app'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import rootReducers from './reducers'

export default class AppRouter extends Component {
  constructor (props) {
    super(props)
    this.store = createStore(rootReducers, applyMiddleware(thunk))
  }

  render () {
    const { match, history } = this.props

    return (
      <Provider store={this.store}>
        <Route history={history} path={`${match.path}/`} component={App} />
      </Provider>
    )
  }
}
