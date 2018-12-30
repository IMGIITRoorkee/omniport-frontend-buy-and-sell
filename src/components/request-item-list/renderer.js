import React from 'react'
import { render } from 'react-dom'
import {
    Grid,
    Breadcrumb,
    Modal,
    Table
} from 'semantic-ui-react'
import ItemDetail from '../request-item-detail/renderer'
import { formatDate } from '../../constants'
import { getTheme } from 'formula_one'
import './index.css'
export default class RequestItemList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {},
        }
    }
    componentDidMount() {
        console.log(this.props.subCategory)
        this.props.getRequestItems(this.props.subCategory)
        this.props.setItemType('request')
    }
    componentWillUnmount() {
        this.props.setItemType('')
    }
    handleOpen = (item) => {
        this.setState({
            item: item,
        })
    }

    render() {
        const { requestItems } = this.props
        return (
            <React.Fragment>
                <Grid.Column width={16} styleName='items-grid'>
                    <Grid padded={"vertically"}>
                        <Grid.Row>
                            <Grid.Column width={8} floated={'left'}>
                                <Breadcrumb>
                                    <Breadcrumb.Section link>Items requested</Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right angle' />
                                    <Breadcrumb.Section active>All</Breadcrumb.Section>
                                </Breadcrumb>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={16} >
                                <Table unstackable color={getTheme()} selectable>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Item</Table.HeaderCell>
                                            <Table.HeaderCell>Maximum price</Table.HeaderCell>
                                            <Table.HeaderCell>Expiry date</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {requestItems.map((item, index) => {
                                            return (
                                                <Modal key={index} trigger={
                                                    <Table.Row onClick={() => this.handleOpen(item)} >
                                                        <Table.Cell>{item.name}</Table.Cell>
                                                        <Table.Cell>{item.cost}</Table.Cell>
                                                        <Table.Cell>{formatDate(item.endDate)}</Table.Cell>
                                                    </Table.Row>
                                                }
                                                    closeIcon>
                                                    <Modal.Content>
                                                        <Grid container >
                                                            <ItemDetail modal={true} requestItemDetail={this.state.item} />
                                                        </Grid>
                                                    </Modal.Content>
                                                </Modal>
                                            )
                                        })}
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </React.Fragment>
        )
    }
}