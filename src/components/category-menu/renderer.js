import React from 'react'
import { render } from 'react-dom'
import { Grid, Menu, Icon, Dropdown } from 'semantic-ui-react'
import './index.css'
const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
]


class DropdownMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { subcategories } = this.props
        let dropdown = subcategories ? subcategories.map((subCategory, index) => {
            return <Dropdown.Item onClick={this.props.onClick} name={subCategory.slug} key={index}>{subCategory.name}</Dropdown.Item>
        }) : null
        const trigger = (
            <span>
                <Icon name={this.props.icon} /> {this.props.name}
            </span>
        )
        return (
            <Dropdown closeOnChange simple closeOnBlur trigger={trigger} styleName='menu-item' icon={null} item >
                <Dropdown.Menu>
                    {dropdown}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}
export default class CategoryMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = { activeItem: '' }

    }
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
        this.props.getSaleItems(`${name}/`)
    }
    componentDidMount() {
    }
    subCategories = (category) => {
        for (let i = 0; i < this.props.categories.length; i++) {
            if (this.props.categories[i].name === category) {
                return this.props.categories[i].subCategories
            }
        }
    }
    render() {
        const { activeItem } = this.state
        return (
            <Grid.Column width={16}>
                <Menu size={'large'} color='blue' styleName='category-menu' borderless icon={'labeled'}>
                    <Menu.Item name=''
                        active={activeItem === ''}
                        onClick={this.handleItemClick}
                        styleName='menu-item'
                    >
                        <Icon name='' />
                        <span styleName='menu-span'>All</span>
                    </Menu.Item>
                    <DropdownMenu
                        icon='computer'
                        name='Electronics'
                        active={activeItem === 'Electronics'}
                        onClick={this.handleItemClick}
                        subcategories={this.subCategories('Electronics')}
                    />
                    <DropdownMenu
                        icon='book'
                        name='Books'
                        active={activeItem === 'Books'}
                        onClick={this.handleItemClick}
                        subcategories={this.subCategories('Books')}
                    />
                    <DropdownMenu
                        icon='student'
                        name='Academics'
                        active={activeItem === 'Academics'}
                        onClick={this.handleItemClick}
                        subcategories={this.subCategories('Academics')}
                    />
                    <Menu.Item name='Bicycles'
                        active={activeItem === 'Bicycles'}
                        onClick={this.handleItemClick}
                        styleName='menu-item'
                    >
                        <Icon name='bicycle' />
                        <span styleName='menu-span'>Bicycles</span>
                    </Menu.Item>
                    <Menu.Item name='Miscellaneous'
                        active={activeItem === 'Miscellaneous'}
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