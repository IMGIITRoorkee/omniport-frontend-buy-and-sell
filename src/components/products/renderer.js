import React from 'react'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'
import './index.css'
import {
    Breadcrumb,
    Sticky,
    Grid
} from 'semantic-ui-react'
import CategoryMenu from '../category-menu'
import ItemMenu from '../item-menu'
import SaleItemList from '../sale-item-list'
import RequestItemList from '../request-item-list'
import { getThemeObject } from 'formula_one'

export default class Items extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    handleItemClick = (e, { slug, name }) => {
        this.props.setCategory(name)
        this.props.setSubCategory(slug)
        if (this.props.itemType == 'sale') {
            this.props.getSaleItems(`${slug}`, 1, true)
            this.props.setPageNo('sale', 1)
        }
        else if (this.props.itemType == 'request') {
            this.props.getRequestItems(`${slug}`, 1, true)
            this.props.setPageNo('request', 1)
        }
    }
    breadcrumbContent = () => {
        const items = []
        const { activeCategory, activeSubCategory, categories, itemType } = this.props
        let item = ''
        if (itemType == 'request') {
            item = 'Items requested'
        }
        else if (itemType == 'sale') {
            item = 'Items for sale'
        }
        if (activeCategory == '') {
            items.push(
                <React.Fragment key={'root'}>
                    <Breadcrumb.Divider icon='right angle' />
                    <Breadcrumb.Section active>All</Breadcrumb.Section>
                </React.Fragment>
            )
        }
        else {
            categories.map(category => {
                if (category.slug == activeSubCategory) {
                    items.push(
                        <React.Fragment key={category.slug}>
                            <Breadcrumb.Divider icon='right angle' />
                            <Breadcrumb.Section active>{category.name}</Breadcrumb.Section>
                        </React.Fragment>
                    )
                }
                else {
                    category.subCategories.map(subCategory => {
                        if (subCategory.slug == activeSubCategory) {
                            items.push(
                                <React.Fragment key={subCategory.slug}>
                                    <Breadcrumb.Divider icon='right angle' />
                                    <Breadcrumb.Section styleName='all-item' style={{ color: getThemeObject().hexCode }} onClick={this.handleItemClick} slug={category.slug} name={category.name} link>{category.name}</Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right angle' />
                                    <Breadcrumb.Section styleName='all-item' active>{subCategory.name}</Breadcrumb.Section>
                                </React.Fragment>
                            )
                        }
                    })
                }
            })
        }
        return (
            <Breadcrumb styleName='breadcrumb-container'>
                <Breadcrumb.Section style={{ color: getThemeObject().hexCode }} name='' slug='' onClick={this.handleItemClick} styleName='all-item' link>{item}</Breadcrumb.Section>
                {items}
            </Breadcrumb>
        )
    }
    handleContextRef = contextRef => this.setState({ contextRef })
    render() {
        const { match } = this.props
        const { contextRef } = this.state
        return (
            <React.Fragment>
                <Grid.Column width={16}>
                    {/* <Sticky scrollContext={window}> */}
                        <Route path={`${match.path}`} component={ItemMenu} />
                        <Route path={`${match.path}`} component={CategoryMenu} />
                    {/* </Sticky> */}
                </Grid.Column>
                <Grid.Column width={16}>
                    <div ref={this.handleContextRef}>
                        <Switch>
                            <Route exact path={`${match.path}`} render={(props) => <SaleItemList breadcrumb={this.breadcrumbContent} {...props} />} />
                            <Route path={`${match.path}buy`} render={(props) => <SaleItemList breadcrumb={this.breadcrumbContent} {...props} />} />
                            <Route path={`${match.path}request`} render={(props) => <RequestItemList breadcrumb={this.breadcrumbContent} {...props} />} />
                        </Switch>
                    </div>
                </Grid.Column>
            </React.Fragment>
        )
    }
}