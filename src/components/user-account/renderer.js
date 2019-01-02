import React from 'react'
import { render } from 'react-dom'
import { Header, Grid, Modal, Radio, Divider, Table } from 'semantic-ui-react'
import { getTheme } from 'formula_one'
import RequestItemDetail from '../request-item-detail/renderer'
import { formatDate } from '../../constants'
import SaleItemCard from '../sale-item-card/'
import SaleItemDetail from '../sale-item-detail/renderer'
import './index.css'

export default class UserAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {}
        }
    }
    componentDidMount() {
        this.props.getSaleItems()
        this.props.getRequestItems()
    }
    handleOpen = (item) => {
        this.setState({
            item: item,
        })
    }
    render() {
        const { userProducts } = this.props
        return (
            <React.Fragment>
                <Grid.Column width={16} styleName='user-grid'>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column computer={3} tablet={4} mobile={4}>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={16}>
                                            <Header as='h3'>
                                                My mobile no.
                                                <Radio slider styleName='mobile-slider' />
                                            </Header>
                                        </Grid.Column>
                                        <Grid.Column width={16}>
                                            (decide whether people can see your phone number)
                                            <Divider />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                            <Grid.Column computer={13} mobile={12} tablet={12}>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Header as='h3'>
                                                Your Account
                                            </Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Header as='h4'>
                                                Items added for sale
                                            </Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid divided={"vertically"} doubling columns={4}>
                                            <Grid.Row stretched>
                                                {userProducts.sale.map((item, index) => {
                                                    return (
                                                        <Modal key={index} trigger={
                                                            <Grid.Column key={index}  >
                                                                <SaleItemCard item={item} onlick={this.handleOpen} />
                                                            </Grid.Column>
                                                        }
                                                            closeIcon>
                                                            <Modal.Content>
                                                                <Grid container styleName="dimmer-grid" >
                                                                    <SaleItemDetail saleItemDetail={this.state.item} />
                                                                </Grid>
                                                            </Modal.Content>
                                                        </Modal>
                                                    )
                                                })}
                                            </Grid.Row>
                                        </Grid>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as='h4'>
                                    Items requested
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
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
                                        {userProducts.request.map((item, index) => {
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
                                                            <RequestItemDetail modal={true} requestItemDetail={this.state.item} />
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
