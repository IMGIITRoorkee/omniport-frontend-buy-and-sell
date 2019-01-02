import React from 'react'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'
import './index.css'
import {
    Breadcrumb,
} from 'semantic-ui-react'
import CategoryMenu from '../category-menu'
import ItemMenu from '../item-menu'
import SaleItemList from '../sale-item-list'
import RequestItemList from '../request-item-list'
import { getThemeObject } from 'formula_one'

export default class Items extends React.Component {
    constructor(props) {
        super(props)
    }
    handleItemClick = (e, { slug, name }) => {
        this.props.setCategory(name)
        this.props.setSubCategory(slug)
        if (this.props.itemType == 'sale') {
            this.props.getSaleItems(`${slug}`)
        }
        else if (this.props.itemType == 'request') {
            this.props.getRequestItems(`${slug}`)
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
                                    <Breadcrumb.Section style={{color : getThemeObject().hexCode}} onClick={this.handleItemClick} slug={category.slug} name={category.name} link>{category.name}</Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right angle' />
                                    <Breadcrumb.Section active>{subCategory.name}</Breadcrumb.Section>
                                </React.Fragment>
                            )
                        }
                    })
                }
            })
        }
        return (
            <Breadcrumb styleName='breadcrumb-container'>
                <Breadcrumb.Section style={{color : getThemeObject().hexCode}} name='' slug='' onClick={this.handleItemClick} link>{item}</Breadcrumb.Section>
                {items}
            </Breadcrumb>
        )
    }
    render() {
        const { match } = this.props
        return (
            <React.Fragment>
                <Route path={`${match.path}`} component={ItemMenu} />
                <Route path={`${match.path}`} component={CategoryMenu} />
                <Switch>
                    <Route exact path={`${match.path}`} render={(props) => <SaleItemList breadcrumb={this.breadcrumbContent} {...props} />} />
                    <Route path={`${match.path}buy`} render={(props) => <SaleItemList breadcrumb={this.breadcrumbContent} {...props} />} />
                    <Route path={`${match.path}request`} render={(props) => <RequestItemList breadcrumb={this.breadcrumbContent} {...props} />} />
                </Switch>
            </React.Fragment>
        )
    }
}