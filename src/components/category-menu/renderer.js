import React from 'react'
import { render } from 'react-dom'
import { Grid, Menu, Icon, Dropdown } from 'semantic-ui-react'
import { getTheme } from 'formula_one'
import { categories } from '../../constants'
import './index.css'

class DropdownMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { subcategories, name, activeCategory, slug } = this.props
        let dropdown = subcategories ? subcategories.map((subCategory, index) => {
            return <Dropdown.Item onClick={this.props.onClick} name={name} slug={subCategory.slug} key={index}>{subCategory.name}</Dropdown.Item>
        }) : null
        const trigger = (
            <span>
                <Icon name={this.props.icon} /> {this.props.name}
            </span>
        )
        return (
            <Dropdown trigger={trigger} className={activeCategory == name ? 'active' : ''} styleName='menu-item' icon={null} item >
                <Dropdown.Menu>
                    <Dropdown.Item onClick={this.props.onClick} name={name} slug={slug} icon={this.props.icon} content={`  ${this.props.name}`} />
                    {dropdown}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}
export default class CategoryMenu extends React.Component {
    constructor(props) {
        super(props)
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
    componentDidMount() {
    }
    subCategories = (category) => {
        for (let i = 0; i < this.props.categories.length; i++) {
            if (this.props.categories[i].slug === category) {
                return this.props.categories[i].subCategories
            }
        }
    }
    render() {
        const { activeCategory } = this.props
        return (
            <Grid.Column width={16}>
                <Menu size={'large'} color={getTheme()} styleName='category-menu' borderless icon={'labeled'}>
                    <Menu.Item name=''
                        slug=''
                        active={activeCategory === ''}
                        onClick={this.handleItemClick}
                        styleName='menu-item'
                    >
                        <Icon name='' />
                        <span styleName='menu-span'>All</span>
                    </Menu.Item>
                    <DropdownMenu
                        icon='computer'
                        name={'Electronics'}
                        slug={categories.Electronics}
                        active={activeCategory === 'Electronics'}
                        onClick={this.handleItemClick}
                        subcategories={this.subCategories(categories.Electronics)}
                        activeCategory={activeCategory}
                    />
                    <DropdownMenu
                        icon='book'
                        name='Books'
                        slug={categories.Books}
                        active={activeCategory === 'Books'}
                        onClick={this.handleItemClick}
                        subcategories={this.subCategories(categories.Books)}
                        activeCategory={activeCategory}
                    />
                    <DropdownMenu
                        icon='student'
                        name='Academic'
                        slug={categories.Academic}
                        active={activeCategory === 'Academic'}
                        onClick={this.handleItemClick}
                        subcategories={this.subCategories(categories.Academic)}
                        activeCategory={activeCategory}
                    />
                    <Menu.Item name='Bicycles'
                        slug={categories.Bicycles}
                        active={activeCategory === 'Bicycles'}
                        onClick={this.handleItemClick}
                        styleName='menu-item'
                    >
                        <Icon name='bicycle' />
                        <span styleName='menu-span'>Bicycles</span>
                    </Menu.Item>
                    <Menu.Item name='Miscellaneous'
                        slug={categories.Miscellaneous}
                        active={activeCategory === 'Miscellaneous'}
                        onClick={this.handleItemClick}
                        styleName='menu-item'
                    >
                        <Icon name='box' />
                        <span styleName='menu-span'>Miscellaneous</span>
                    </Menu.Item>
                </Menu>
            </Grid.Column>
        )
    }
}