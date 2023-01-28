import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import {
  Search,
  Popup,
  Grid,
  Responsive,
  Button,
  Icon,
  Modal
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getTheme } from 'formula_one'
import { appUrl, getExcerpt } from '../../constants'
import './index.css'

export default class SearchBar extends React.Component {
  state = {
    searchFocus: false
  }

  componentWillMount () {
    this.resetComponent()
  }
  componentDidMount () {}

  resetComponent = () => this.setState({ isLoading: false, value: '' })

  handleFocus = () =>
    this.setState(
      {
        searchFocus: !this.state.searchFocus,
        value: ''
      },
      () => {
        this.props.setSearchFocus(this.state.searchFocus)
      }
    )

  handleResultSelect = (e, { result }) => {
    this.setState({ value: '' })
    this.props.history.replace(`/buy_and_sell/${result.type}/${result.id}`)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    this.props.getSearchProducts(value.trim())
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()
      this.setState({
        isLoading: false
      })
    }, 300)
  }

  generateResults = () => {
    const { searchProducts } = this.props
    let results = {}
    if (searchProducts.length < 1) {
      return results
    }
    results = {
      sale: {
        name: 'Items for sale',
        results: []
      },
      request: {
        name: 'Items requested',
        results: []
      }
    }
    searchProducts.map((product, index) => {
      if (product.paymentModes) {
        results.sale.results.push({
          key: index,
          title: product.name,
          description: `${product.isRental ? 'For Rent' : 'For Sale'}`,
          image: `${product.pictures.length > 0 ? product.pictures[0] : ''}`,
          price: `₹${product.isRental ? product.cost + ' per ' + product.periodicity : product.cost }`,
          id: product.id,
          type: 'buy'
        })
      } else {
        results.request.results.push({
          key: index,
          title: product.name,
          description: `${product.isRental ? 'For Rent' : 'For Sale'}`,
          image: '',
          price: `₹${product.isRental ? product.cost + ' per ' + product.periodicity : product.cost }`,
          id: product.id,
          type: 'request'
        })
      }
    })
    results.request.results.slice()
    results.sale.results.slice()
    return results
  }

  generateMobileResults = () => {
    const { searchProducts } = this.props
    let resultsSale = []
    let resultsRequest = []
    if (searchProducts.length < 1) {
      return []
    }
    searchProducts.map((product, index) => {
      if (product.paymentModes) {
        resultsSale.push({
          key: index,
          title: product.name,
          description: `${getExcerpt(product.details, 48)}`,
          image: `${product.pictures.length > 0 ? product.pictures[0] : ''}`,
          price: `₹${product.cost}`,
          id: product.id,
          type: 'buy'
        })
      } else {
        resultsRequest.push({
          key: index,
          title: product.name,
          description: `Requested by ${product.person.person.fullName}`,
          image: '',
          price: `₹${product.cost}`,
          id: product.id,
          type: 'request'
        })
      }
    })
    resultsSale.slice()
    resultsRequest.slice()
    return [...resultsSale, ...resultsRequest]
  }

  render () {
    const { isLoading, value, searchFocus } = this.state
    return (
      <Grid styleName='nav-cont'>
        <Responsive
          as={React.Fragment}
          minWidth={Responsive.onlyTablet.maxWidth + 1}
        >
          <Grid.Row centered>
            <Grid.Column computer={10}>
              <Grid padded={'horizontally'}>
                <Grid.Row centered>
                  <Grid.Column floated='right' computer={12}>
                    <Search
                      category
                      loading={isLoading}
                      onResultSelect={this.handleResultSelect}
                      onSearchChange={_.debounce(this.handleSearchChange, 500, {
                        leading: true
                      })}
                      results={this.generateResults()}
                      value={value}
                      minCharacters={1}
                      className={'bns-nav-search-bar'}
                      fluid
                      placeholder='Search'
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>

            <Grid.Column floated='right' computer={6}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <Link to={appUrl + 'request_item/'}>
                      <Button
                        fluid
                        content='Request'
                        color={getTheme()}
                        styleName='form-btn'
                      />
                    </Link>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <Link to={appUrl + 'sell_item/'}>
                      <Button
                        fluid
                        color={getTheme()}
                        content='Sell'
                        styleName='form-btn'
                      />
                    </Link>
                  </Grid.Column>
                  <Grid.Column styleName='account-btn' width={4}>
                    <Link
                      to={appUrl + 'my_account/'}
                      styleName='account-btn-link'
                    >
                      <Popup
                        keepInViewPort
                        position='bottom center'
                        trigger={<Icon name='user' color='black' size='big' />}
                        content='My account'
                      />
                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Responsive>
        <Responsive
          as={React.Fragment}
          maxWidth={Responsive.onlyTablet.maxWidth}
        >
          <Grid.Row>
            <Grid.Column floated='right' styleName='account-btn' width={14}>
              <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                onBlur={this.handleFocus}
                onFocus={this.handleFocus}
                results={this.generateMobileResults()}
                value={value}
                minCharacters={1}
                className={`bns-nav-search-bar bns-nav-search-bar-mobile ${
                  searchFocus ? 'focused-search-mobile' : ''
                }`}
              />
            </Grid.Column>
            <Grid.Column styleName='account-btn' width={1}>
              <Link to={appUrl + 'my_account/'} styleName='account-btn-link'>
                <Responsive
                  as={React.Fragment}
                  minWidth={Responsive.onlyTablet.maxWidth + 1}
                >
                  <Popup
                    keepInViewPort
                    position='bottom center'
                    trigger={<Icon name='user' color='black' size='big' />}
                    content='My account'
                  />
                </Responsive>
                <Responsive
                  as={React.Fragment}
                  maxWidth={Responsive.onlyTablet.maxWidth}
                >
                  <Icon name='user' color='black' size='big' />
                </Responsive>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Responsive>
      </Grid>
    )
  }
}
