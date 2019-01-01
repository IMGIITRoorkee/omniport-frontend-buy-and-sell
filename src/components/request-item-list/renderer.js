import React from 'react'
import { render } from 'react-dom'
import {
    Grid,
    Modal,
    Table,
    Loader
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
            page: 1,
            loading: false
        }
    }
    componentDidMount() {
        this.props.getRequestItems(this.props.activeSubCategory, 1, true)
        this.props.setItemType('request')
        window.addEventListener("scroll", () => {
            const { requestProductCount } = this.props
            const { page } = this.state
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight && requestProductCount > (page * 10)) {
                this.setState({
                    loading: true,
                    page: this.state.page + 1
                }, () => {
                    this.props.getRequestItems(this.props.activeSubCategory, this.state.page)
                    setTimeout(() => {
                        this.setState({
                            loading: false
                        });
                    }, 300);
                })
            }
        })
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
        const { requestItems, breadcrumb } = this.props
        const { loading } = this.state
        return (
            <React.Fragment>
                <Grid.Column width={16} styleName='items-grid'>
                    <Grid padded={"vertically"}>
                        <Grid.Row>
                            <Grid.Column width={8} floated={'left'}>
                                {breadcrumb()}
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
                        <Grid.Row styleName={'loader'}>
                            <Grid.Column width={16} padded={"vertically"}>
                                {loading ?
                                    <Loader active />
                                    : null
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </React.Fragment>
        )
    }
}