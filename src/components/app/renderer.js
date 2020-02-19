import React, { Suspense, lazy } from 'react'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import './index.css'
import { AppHeader, AppFooter, Loading } from 'formula_one'
const Products = lazy(() => import('../products'))
const SaleItemForm = lazy(() => import('../sale-item-form'))
const SaleItemDetail = lazy(() => import('../sale-item-detail'))
const RequestItemDetail = lazy(() => import('../request-item-detail'))
const RequestItemForm = lazy(() => import('../request-item-form'))
const SearchBar = lazy(() => import('../navbar-components'))
const UserAccount = lazy(() => import('../user-account'))
const AddButton = lazy(() => import('../add-item-button'))

const creators = [
  {
    name: 'Vivek Chand',
    role: 'Developer',
    link: 'https://github.com/Vivekrajput20'
  },
  {
    name: 'Manya Singh',
    role: 'Designer'
    link: 'https://dribbble.com/manyas'
  }
  {
    name: 'Suyash Salampuria',
    role: 'Developer',
    link: 'https://github.com/SuyashSalampuria'
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
        <Suspense fallback={<Loading />}>
          <Route
            path={`${match.path}`}
            render={props => (
              <AddButton scrollDiv={this.scrollDiv} {...props} />
            )}
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
        </Suspense>
        <AppFooter creators={creators} />
      </div>
    )
  }
}
