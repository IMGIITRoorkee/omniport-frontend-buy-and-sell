import React from 'react'
import { render } from 'react-dom'
import { Grid, Menu, Responsive } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { appUrl } from '../../constants/urls'
import { getTheme } from 'formula_one'
import './index.css'

export default class ItemMenu extends React.Component {
  getMenu = width => {
    const { itemType } = this.props
    return (
      <Grid.Column width={16}>
        <Menu
          styleName='item-menu'
          widths={width}
          size={'huge'}
          color={getTheme()}
          pointing
          secondary
        >
          <Menu.Item
            styleName='link-item'
            as={Link}
            name='sale'
            active={itemType === 'sale'}
            to={appUrl + 'buy/'}
          >
            <span styleName='type-name'>Items listed</span>
          </Menu.Item>
          <Menu.Item
            styleName='link-item'
            as={Link}
            name='request'
            active={itemType === 'request'}
            to={appUrl + 'request/'}
          >
            <span styleName='type-name'>Requested items</span>
          </Menu.Item>
        </Menu>
      </Grid.Column>
    )
  }
  render () {
    return (
      <>
        <Responsive {...Responsive.onlyMobile}>{this.getMenu(2)}</Responsive>
        <Responsive minWidth={Responsive.onlyMobile.maxWidth + 1}>
          {this.getMenu(4)}
        </Responsive>
      </>
    )
  }
}
