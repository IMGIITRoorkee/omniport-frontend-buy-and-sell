import React from 'react'
import { render } from 'react-dom'
import { Grid, Modal, Table } from 'semantic-ui-react'
import { isMobile } from 'react-device-detect'
import CustomPopup from '../custom-popup'
import { formatDate } from '../../constants'
import ItemDetail from '../request-item-detail/renderer'
import './index.css'
export default class CustomRequestModal extends React.Component {
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
          <Table.Row>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>₹{item.cost}</Table.Cell>
            <Table.Cell>{formatDate(item.endDate)}</Table.Cell>
            {!isMobile ? (
              <Table.Cell width={1} textAlign='right'>
                {this.isOwner(item.person) ? (
                  <CustomPopup type='request' item={item} />
                ) : null}
              </Table.Cell>
            ) : null}
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
