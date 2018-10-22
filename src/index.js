import { render } from 'react-dom'
import { Route } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store';
import SaleItemForm from './components/sale-item-list'
export default class AppRouter extends React.Component {
    render() {
        window.store = store;
        const { match } = this.props
        return (
            <Provider store={store}>
                <Route path={`${match.path}/`} component={SaleItemForm} />
                {/* Default Route */}
            </Provider>
        )
    }
}


