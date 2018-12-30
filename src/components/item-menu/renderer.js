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

    }
    componentDidMount() {

    }
    render() {
        const { itemType } = this.props
        return (
            <Grid.Column width={16}>
                <Menu size={'huge'} widths={4} color={getTheme()} pointing secondary>
                    <Menu.Item
                        as={Link} name='sale'
                        active={itemType === 'sale'}
                        to={appUrl + 'buy/'}
                    >
                        Items for sale
                    </Menu.Item>
                    <Menu.Item
                        as={Link} name='request'
                        active={itemType === 'request'}
                        to={appUrl + 'request/'}
                    >
                        Requested items
                    </Menu.Item>
                </Menu>
            </Grid.Column>
        )
    }
}