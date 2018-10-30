import React from 'react'
import { render } from 'react-dom'
import {Switch, Route } from 'react-router-dom'
import './index.css'
import CategoryMenu from '../category-menu'
import ItemMenu from '../item-menu'
import SaleItemList from '../sale-item-list'
export default class ItemsList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { match } = this.props
        return (
            <React.Fragment>
                <Route path={`${match.path}`} component={ItemMenu} />
                <Route path={`${match.path}`} component={CategoryMenu} />
                <Switch>
                    <Route exact path={`${match.path}`} component={SaleItemList} />
                    <Route path={`${match.path}buy`} component={SaleItemList} />
                </Switch>
            </React.Fragment>
        )
    }
}