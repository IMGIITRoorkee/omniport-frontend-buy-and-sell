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
import RequestItemForm from '../request-item-form'
import SearchBar from '../navbar-components'
import UserAccount from '../user-account'
import AddButton from '../add-item-button'

const creators = [
  {
    name: 'Vivek Chand',
    role: 'Developer'
  },
  {
    name: 'Manya Singh',
    role: 'Designer'
  }
]

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.divRef = React.createRef()
  }

  componentDidMount () {
    this.props.getCategories()
    this.props.getUser()
  }

  scrollDiv = () => {
    if (this.divRef && this.divRef.current) {
      this.divRef.current.scrollTo(0, 0)
    }
  }

  render () {
    const { match } = this.props

    return (
      <div ref={this.divRef} styleName='app-wrapper'>
        <Route
          path={`${match.path}`}
          render={props => <AddButton scrollDiv={this.scrollDiv} {...props} />}
        />
        <Switch>
          <Route
            path={`${match.path}`}
            render={props => (
              <AppHeader
                appName='buy_and_sell'
                mode={'app'}
                middle={<SearchBar {...props} />}
                userDropdown
              />
            )}
          />
        </Switch>
        <div styleName='app-container'>
          <Grid container>
            <Grid.Row>
              <Switch>
                <Route
                  path={`${match.path}sell_item`}
                  render={props => (
                    <SaleItemForm scrollDiv={this.scrollDiv} {...props} />
                  )}
                />
                <Route
                  path={`${match.path}request_item`}
                  render={props => (
                    <RequestItemForm scrollDiv={this.scrollDiv} {...props} />
                  )}
                />
                <Route
                  path={`${match.path}my_account`}
                  component={UserAccount}
                />
                <Route
                  path={`${match.path}buy/:id`}
                  component={SaleItemDetail}
                />
                <Route
                  path={`${match.path}request/:id`}
                  component={RequestItemDetail}
                />
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
