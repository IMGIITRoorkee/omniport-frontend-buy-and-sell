import React from 'react'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'
import { Grid, Icon, Dropdown } from 'semantic-ui-react'
import './index.css'
import { AppHeader, AppFooter } from 'formula_one'
import Products from '../products'
import SaleItemForm from '../sale-item-form'
import SaleItemDetail from '../sale-item-detail'
import RequestItemDetail from '../request-item-detail'

const creators = [
    {
        name: 'Vivek Chand',
        role: 'Developer'
    },
]
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
            <div styleName="app-wrapper">
                <AppHeader
                    appName='buy_and_sell'
                    middle={false}
                    userDropdown
                />
                <div styleName='app-container'>
                    <Grid container >
                        <Grid.Row>
                            <Switch>
                                <Route path={`${match.path}sell_item`} component={SaleItemForm} />
                                <Route path={`${match.path}buy/:id`} component={SaleItemDetail} />
                                <Route path={`${match.path}request/:id`} component={RequestItemDetail} />
                                <Route path={`${match.path}`} component={Products} />
                            </Switch>
                        </Grid.Row>
                    </Grid>
                </div>
                <AppFooter creators={creators} />
            </div>

        )
    }
}