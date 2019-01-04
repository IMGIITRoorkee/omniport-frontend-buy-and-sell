
import React from 'react'
import { render } from 'react-dom'
import {
    Grid,
    Modal,
    Table,
} from 'semantic-ui-react'
import  CustomPopup  from '../custom-popup'
import { formatDate } from '../../constants'
import ItemDetail from '../request-item-detail/renderer'
export default class CustomRequestModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    isOwner = (itemUser) => {
        const { user } = this.props
        if (user.person) {
            return user.person.contactInformation.emailAddress == itemUser.person.contactInformation.emailAddress
        }
        return false
    }
    render() {
        const { item, index, deleteItem } = this.props
        return (
            <Modal key={index} trigger={
                <Table.Row>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.cost}</Table.Cell>
                    <Table.Cell>{formatDate(item.endDate)}</Table.Cell>
                    {this.isOwner(item.person) ?
                        <Table.Cell textAlign='right'>
                            <CustomPopup deleteItem={deleteItem} type='request' item={item} />
                        </Table.Cell>
                        : null
                    }
                </Table.Row>
            }
                closeIcon>
                <Modal.Content>
                    <Grid container >
                        <ItemDetail modal={true} requestItemDetail={item} />
                    </Grid>
                </Modal.Content>
            </Modal>
        )
    }
}