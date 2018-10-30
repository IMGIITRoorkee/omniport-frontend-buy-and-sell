import React from 'react'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'
import './index.css'
import SearchBar from '../navigation-bar'
import ItemsList from '../items-list'
import SaleItemForm from '../sale-item-form'

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { match } = this.props
        return (
            <React.Fragment>
                <Route path={`${match.path}`} component={SearchBar} />
                <Switch>
                    <Route path={`${match.path}sell_item`} component={SaleItemForm} />
                    <Route path={`${match.path}`} component={ItemsList} />
                </Switch>
            </React.Fragment>
        )
    }
}