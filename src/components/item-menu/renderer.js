import React from 'react'
import { render } from 'react-dom'
import { Grid, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { appUrl } from '../../constants/urls'
import { getTheme } from 'formula_one'
import './index.css'

export default class ItemMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = { activeItem: 'sale' }
        this.handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    }
    componentDidMount() {
    }
    render() {
        const { activeItem } = this.state
        return (
            <Grid.Column width={16}>
                <Menu size={'huge'} widths={4} color={getTheme()} pointing secondary>
                    <Menu.Item
                        as={Link} name='sale'
                        active={activeItem === 'sale'}
                        onClick={this.handleItemClick}
                        to={appUrl + 'buy/'}
                    >
                        Items for sale
                    </Menu.Item>
                    <Menu.Item
                        as={Link} name='request'
                        active={activeItem === 'request'}
                        onClick={this.handleItemClick}
                        to={appUrl + 'request/'}
                    >
                        Requested items
                    </Menu.Item>
                </Menu>
            </Grid.Column>
        )
    }
}