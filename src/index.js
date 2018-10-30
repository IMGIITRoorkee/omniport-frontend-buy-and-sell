import { render } from 'react-dom'
import { Route } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store';
import Home from './components/app'
export default class AppRouter extends React.Component {
    render() {
        window.store = store;
        
        return (
            <Provider store={store}>
                <Route path={`${this.props.match.path}/`} component={Home} />
                {/* Default Route */}
            </Provider>
        )
    }
}


