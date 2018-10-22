import React from 'react'
import { render } from 'react-dom'
import { Grid, Menu } from 'semantic-ui-react'
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
            <Grid centered doubling container>
                <Grid.Row>
                    <Grid.Column width={15}>
                        <Menu className="bns-item-menu" size={'huge'} widths={4} color={'blue'} pointing secondary>
                            <Menu.Item name='sale'
                                active={activeItem === 'sale'}
                                onClick={this.handleItemClick}>Items for sale</Menu.Item>
                            <Menu.Item name='request'
                                active={activeItem === 'request'}
                                onClick={this.handleItemClick}>Requested items</Menu.Item>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}