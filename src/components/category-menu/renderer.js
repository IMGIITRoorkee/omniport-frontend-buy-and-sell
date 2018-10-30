import React from 'react'
import { render } from 'react-dom'
import { Grid, Menu, Icon } from 'semantic-ui-react'
import './index.css'

export default class CategoryMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = { activeItem: '' }
        this.handleItemClick = (e, { name }) => {
            this.setState({ activeItem: name })
            this.props.getSaleItems(name)
        }
    }
    componentDidMount() {
    }
    render() {
        const { activeItem } = this.state
        return (
            <Grid centered padded={'vertically'} container>
                <Grid.Row>
                    <Grid.Column width={14}>
                        <Menu size={'large'} color='blue' styleName='category-menu' borderless icon={'labeled'}>
                            <Menu.Item name=''
                                active={activeItem === ''}
                                onClick={this.handleItemClick}
                                styleName='menu-item'
                            >
                                <Icon name='' />
                                <span styleName='menu-span'>All</span>
                            </Menu.Item>
                            <Menu.Item name='Electronics'
                                active={activeItem === 'Electronics'}
                                onClick={this.handleItemClick}
                                styleName='menu-item'
                            >
                                <Icon name='computer' />
                                <span styleName='menu-span'>Electronics</span>
                            </Menu.Item>
                            <Menu.Item name='Books'
                                active={activeItem === 'Books'}
                                onClick={this.handleItemClick}
                                styleName='menu-item'
                            >
                                <Icon name='book' />
                                <span styleName='menu-span'>Books</span>
                            </Menu.Item>
                            <Menu.Item name='Academics'
                                active={activeItem === 'Academics'}
                                onClick={this.handleItemClick}
                                styleName='menu-item'
                            >
                                <Icon name='student' />
                                <span styleName='menu-span'>Academics</span>
                            </Menu.Item>
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
                </Grid.Row>
            </Grid>
        )
    }
}