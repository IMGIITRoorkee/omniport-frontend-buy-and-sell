import React from 'react'
import { render } from 'react-dom'
import { Grid, Menu, Icon, Dropdown } from 'semantic-ui-react'
import { getTheme } from 'formula_one'
import { categories } from '../../constants'
import './index.css'

class DropdownMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }
    mouseOver = () => {
        this.setState({
            open: true
        })
    }
    mouseOut = () => {
        this.setState({
            open: false
        })
    }
    handleClick = (e, slug, name) => {
        this.setState({
            open: false
        })
        this.props.onClick(e, slug, name)
    }
    render() {
        const { open } = this.state
        let { subcategories, name, activeCategory, slug, icon } = this.props
        let dropdown = subcategories ? subcategories.map((subCategory, index) => {
            return <Dropdown.Item onClick={(e) => this.handleClick(e, subCategory.slug, name)} name={name} slug={subCategory.slug} key={index}>{subCategory.name}</Dropdown.Item>
        }) : null
        const trigger = (
            <div onMouseOver={(e) => this.mouseOver(e)} onClick={(e) => this.handleClick(e, slug, name)}>
                <Icon name={icon} /> {name}
            </div>
        )
        return (
            <div onMouseLeave={this.mouseOut}>
                <Dropdown open={open} trigger={trigger} className={activeCategory == name ? 'active' : ''} styleName='menu-item' icon={null} item >
                    <Dropdown.Menu  >
                        {dropdown}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}
export default class CategoryMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }
    handleItemClick = (e, slug, name) => {
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
    mouseOver = (slug) => {
        this.setState({
            open: slug
        })
    }
    mouseOut = () => {
        this.setState({
            open: ''
        })
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
        const { open } = this.state
        const { activeCategory } = this.props
        return (
            <Grid.Column width={16}>
                <Menu size={'large'} color={getTheme()} styleName='category-menu' borderless icon={'labeled'}>
                    <div onMouseOver={(slug) => this.mouseOver('All')} onMouseLeave={this.mouseOut}>
                        <Menu.Item name=''
                            slug=''
                            active={activeCategory === '' || open == 'All'}
                            onClick={(e) => this.handleItemClick(e, '', '')}
                            styleName='menu-item all-item'
                        >
                            <Icon name='' />
                            <span styleName='menu-span'>All</span>
                        </Menu.Item>
                    </div>
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
                    <div onMouseOver={(slug) => this.mouseOver('Bicycles')} onMouseLeave={this.mouseOut}>
                        <Menu.Item name='Bicycles'
                            slug={categories.Bicycles}
                            active={activeCategory === 'Bicycles' || open == 'Bicycles'}
                            onClick={(e) => this.handleItemClick(e, categories.Bicycles, 'Bicycles')}
                            styleName='menu-item'
                        >
                            <span ref={(el) => {
                                if (el) {
                                    el.style.setProperty('font-size', '1.2em', 'important');
                                }
                            }}>
                                <Icon name='bicycle' />
                            </span>
                            <span styleName='menu-span'>Bicycles</span>
                        </Menu.Item>
                    </div>
                    <div onMouseOver={(slug) => this.mouseOver('Miscellaneous')} onMouseLeave={this.mouseOut}>
                        <Menu.Item name='Miscellaneous'
                            slug={categories.Miscellaneous}
                            active={activeCategory === 'Miscellaneous' || open == 'Miscellaneous'}
                            onClick={(e) => this.handleItemClick(e, categories.Miscellaneous, 'Miscellaneous')}
                        styleName='menu-item'
                        >   <div>
                            <span ref={(el) => {
                                if (el) {
                                    el.style.setProperty('font-size', '1em', 'important');
                                }
                            }}>
                                <Icon name='box' />
                            </span>
                            <span styleName='menu-span'>Miscellaneous</span>
                        </div>
                        </Menu.Item>
                    </div>
                </Menu>
            </Grid.Column >
        )
    }
}