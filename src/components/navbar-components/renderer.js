import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import { Search, Grid, Button, Icon, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getTheme } from 'formula_one'
import { appUrl, getExcerpt } from '../../constants'
import './index.css'

export default class SearchBar extends React.Component {
  componentWillMount () {
    this.resetComponent()
  }
  componentDidMount () {}

  resetComponent = () => this.setState({ isLoading: false, value: '' })

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
          description: `${getExcerpt(product.details, 48)}`,
          image: `${product.pictures.length > 0 ? product.pictures[0] : ''}`,
          price: `₹${product.cost}`,
          id: product.id,
          type: 'buy'
        })
      } else {
        results.request.results.push({
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
    results.request.results.slice()
    results.sale.results.slice()
    return results
  }
  render () {
    const { isLoading, value } = this.state
    return (
      <Grid styleName='nav-cont'>
        <Grid.Row centered>
          <Grid.Column computer={10} tablet={8} mobile={8}>
            <Grid padded={'horizontally'}>
              <Grid.Row centered>
                <Grid.Column floated='right' computer={12} mobile={16}>
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
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column floated='right' computer={6} tablet={8} mobile={8}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={6}>
                  <Link to={appUrl + 'request_item/'}>
                    <Button fluid content='Request' color={getTheme()} />
                  </Link>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Link to={appUrl + 'sell_item/'}>
                    <Button fluid color={getTheme()} content='Sell' />
                  </Link>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Link to={appUrl + 'my_account/'}>View Profile</Link>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
