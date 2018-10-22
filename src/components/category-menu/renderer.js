import React from 'react'
import { render } from 'react-dom'
import { Grid, Menu, Icon } from 'semantic-ui-react'
import './index.css'

export default class CategoryMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = { activeItem: '' }
        this.handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    }
    componentDidMount() {
    }
    render() {
        const { activeItem } = this.state
        return (
            <Grid centered padded={'vertically'} container>
                <Grid.Row>
                    <Grid.Column width={14}>
                        <Menu size={'large'} color='blue' className='category-menu' borderless icon={'labeled'}>
                            <Menu.Item name='all'
                                active={activeItem === 'all'}
                                onClick={this.handleItemClick}>
                                <Icon name='' />
                                <span>All</span>
                            </Menu.Item>
                            <Menu.Item name='Electronics'
                                active={activeItem === 'Electronics'}
                                onClick={this.handleItemClick}>
                                <Icon name='computer' />
                                <span>Electronics</span>
                            </Menu.Item>
                            <Menu.Item name='Books'
                                active={activeItem === 'Books'}
                                onClick={this.handleItemClick}>
                                <Icon name='book' />
                                <span>Books</span>
                            </Menu.Item>
                            <Menu.Item name='Academics'
                                active={activeItem === 'Academics'}
                                onClick={this.handleItemClick}>
                                <Icon name='student' />
                                <span>Academics</span>
                            </Menu.Item>
                            <Menu.Item name='Bicycles'
                                active={activeItem === 'Bicycles'}
                                onClick={this.handleItemClick}>
                                <Icon name='bicycle' />
                                <span>Bicycles</span>
                            </Menu.Item>
                            <Menu.Item name='Miscellaneous'
                                active={activeItem === 'Miscellaneous'}
                                onClick={this.handleItemClick}>
                                <Icon name='box' />
                                <span>Miscellaneous</span>
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}