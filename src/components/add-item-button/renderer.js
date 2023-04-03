import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import { Responsive, Transition, Button } from 'semantic-ui-react'
import { getThemeObject, getTheme } from 'formula_one'
import './index.css'

export default class AddButton extends React.Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })
  handleClick = () => {
    this.toggleVisibility()
    this.props.scrollDiv()
  }
  render () {
    const { visible } = this.state
    const { location } = this.props
    const sell = '/buy_and_sell/sell_item/'
    const request = '/buy_and_sell/request_item/'
    const hide = location.pathname === sell || location.pathname === request
    return (
      <>
        {hide ? null : (
          <Responsive
            as={React.Fragment}
            maxWidth={Responsive.onlyTablet.maxWidth}
          >
            <div
              onClick={this.toggleVisibility}
              style={{ background: getThemeObject().hexCode }}
              styleName='add-product-btn'
            >
              +
            </div>
            <Transition visible={visible} animation='zoom' duration={400}>
              <Link
                onClick={this.handleClick}
                to='/buy_and_sell/sell_item/'
                styleName='add-item-btn sale-btn'
              >
                <div styleName='item-btn-div'>Create Listing</div>
              </Link>
            </Transition>
            <Transition visible={visible} animation='zoom' duration={400}>
              <Link
                onClick={this.handleClick}
                to='/buy_and_sell/request_item/'
                styleName='add-item-btn request-btn'
              >
                <div styleName='item-btn-div'>Request an Item</div>
              </Link>
            </Transition>
          </Responsive>
        )}
      </>
    )
  }
}
