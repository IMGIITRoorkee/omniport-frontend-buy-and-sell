import React from 'react'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'
import { Grid, Icon, Dropdown } from 'semantic-ui-react'
import './index.css'
import SearchBar from '../navigation-bar'
import Products from '../products'
import SaleItemForm from '../sale-item-form'
import SaleItemDetail from '../sale-item-detail'

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCategories();
        this.props.getUser();
    }

    render() {
        const { match } = this.props
        return (
            <Grid container>
                <Grid.Row>
                    <Route path={`${match.path}`} component={SearchBar} />
                </Grid.Row>
                <Grid.Row>
                    <Switch>
                        <Route path={`${match.path}sell_item`} component={SaleItemForm} />
                        <Route path={`${match.path}buy/:id`} component={SaleItemDetail} />
                        <Route path={`${match.path}`} component={Products} />
                    </Switch>
                </Grid.Row>
            </Grid>
        )
    }
}