import React from 'react'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'
import './index.css'
import { Breadcrumb, Grid, Visibility } from 'semantic-ui-react'
import CategoryMenu from '../category-menu'
import ItemMenu from '../item-menu'
import SaleItemList from '../sale-item-list'
import RequestItemList from '../request-item-list'
import { getThemeObject } from 'formula_one'

export default class Items extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      topPassed: false,
      height: 0
    }
  }
  handleItemClick = (e, { slug, name }) => {

    this.props.setCategory(name)
    this.props.setSubCategory(slug)
    if (this.props.itemType === 'sale') {
      this.props.getSaleItems(`${slug}`, this.props.activeFilter, 1, true)
      this.props.setPageNo('sale', 1)
    } else if (this.props.itemType === 'request') {
      this.props.getRequestItems(`${slug}`, 1, true)
      this.props.setPageNo('request', 1)
    }
  }

  handleUpdate = (e, { calculations }) =>
    this.setState({
      topPassed: calculations.topPassed
    })

  setHeight = (e, { calculations }) =>
    this.setState({
      height: calculations.height
    })

  breadcrumbContent = () => {
    const items = []
    const {
      activeCategory,
      activeSubCategory,
      categories,
      itemType
    } = this.props
    let item = ''
    if (itemType === 'request') {
      item = 'Items requested'
    } else if (itemType === 'sale') {
      item = 'Items listed'
    }
    if (activeCategory === '') {
      items.push(
        <React.Fragment key={'root'}>
          <Breadcrumb.Divider icon='right angle' />
          <Breadcrumb.Section active>All</Breadcrumb.Section>
        </React.Fragment>
      )
    } else {
      categories.map(category => {
        if (category.slug === activeSubCategory) {
          items.push(
            <React.Fragment key={category.slug}>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section active>{category.name}</Breadcrumb.Section>
            </React.Fragment>
          )
        } else {
          category.subCategories.map(subCategory => {
            if (subCategory.slug === activeSubCategory) {
              items.push(
                <React.Fragment key={subCategory.slug}>
                  <Breadcrumb.Divider icon='right angle' />
                  <Breadcrumb.Section
                    styleName='all-item'
                    style={{ color: getThemeObject().hexCode }}
                    onClick={this.handleItemClick}
                    slug={category.slug}
                    name={category.name}
                    link
                  >
                    {category.name}
                  </Breadcrumb.Section>
                  <Breadcrumb.Divider icon='right angle' />
                  <Breadcrumb.Section styleName='all-item' active>
                    {subCategory.name}
                  </Breadcrumb.Section>
                </React.Fragment>
              )
            }
          })
        }
      })
    }
    return (
      <Breadcrumb styleName='breadcrumb-container'>
        <Breadcrumb.Section
          style={{ color: getThemeObject().hexCode }}
          name=''
          slug=''
          onClick={this.handleItemClick}
          styleName='all-item'
          link
        >
          {item}
        </Breadcrumb.Section>
        {items}
      </Breadcrumb>
    )
  }

  render () {
    const { match, searchFocus } = this.props
    const { height, topPassed } = this.state
    return (
      <React.Fragment>
        <Visibility once={false} onUpdate={this.handleUpdate} />
        <Grid.Column
          styleName={topPassed && !searchFocus ? 'fixed-nav' : ''}
          width={16}
        >
          <Visibility onUpdate={this.setHeight} fireOnMount>
            <Route path={`${match.path}`} component={ItemMenu} />
            <Route path={`${match.path}`} component={CategoryMenu} />
          </Visibility>
        </Grid.Column>
        {topPassed && !searchFocus ? (
          <Grid.Column width={16} style={{ height: height }} />
        ) : null}
        <Grid.Column width={16}>
          <Switch>
            <Route
              exact
              path={`${match.path}`}
              render={props => (
                <SaleItemList breadcrumb={this.breadcrumbContent} {...props} />
              )}
            />
            <Route
              path={`${match.path}buy`}
              render={props => (
                <SaleItemList breadcrumb={this.breadcrumbContent} {...props} />
              )}
            />
            <Route
              path={`${match.path}request`}
              render={props => (
                <RequestItemList
                  breadcrumb={this.breadcrumbContent}
                  {...props}
                />
              )}
            />
          </Switch>
        </Grid.Column>
      </React.Fragment>
    )
  }
}
