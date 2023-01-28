import React from 'react'
import { render } from 'react-dom'
import { Grid, Responsive, Modal, Table, Label } from 'semantic-ui-react'
import { isMobile } from 'react-device-detect'
import CustomPopup from '../custom-popup'
import { formatDate } from '../../constants'
import ItemDetail from '../request-item-detail/renderer'
import './index.css'
export default class CustomRequestRow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  isOwner = itemUser => {
    const { user } = this.props
    if (user.person) {
      return user.person.id === itemUser.person.id
    }
    return false
  }
  render () {
    const { item, index } = this.props
    return (
      <Modal
        size='tiny'
        key={index}
        trigger={
          <Table.Row styleName='request-item-row'>
            <Table.Cell styleName='first-cell'>{item.name}</Table.Cell>
            {item.isRental ? 
            <Table.Cell styleName='first-cell'>
              <Label  color='red'>
                RENT
              </Label>
            </Table.Cell>
            :
            <Table.Cell styleName='first-cell'>
              <Label  color='blue'>
                SALE
              </Label>
            </Table.Cell>
            }
            
            <Responsive
              as={React.Fragment}
              minWidth={Responsive.onlyTablet.maxWidth + 1}
            >
              {item.isRental ?
              <Table.Cell>₹{item.cost} per {item.periodicity}</Table.Cell>
              :
              <Table.Cell>₹{item.cost}</Table.Cell>
              }
              
              <Table.Cell>{formatDate(item.endDate)}</Table.Cell>
            </Responsive>
            <Table.Cell width={1} textAlign='right'>
              {this.isOwner(item.person) ? (
                <CustomPopup type='request' item={item} />
              ) : null}
            </Table.Cell>
          </Table.Row>
        }
        closeIcon
      >
        <Modal.Content>
          <Grid>
            <ItemDetail modal requestItemDetail={item} />
          </Grid>
        </Modal.Content>
      </Modal>
    )
  }
}
