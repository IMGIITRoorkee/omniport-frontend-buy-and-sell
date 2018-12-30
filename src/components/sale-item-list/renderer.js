import React from 'react'
import { render } from 'react-dom'
import {
    Grid,
    Breadcrumb,
    Dropdown,
    Header,
    Modal
} from 'semantic-ui-react'
import ItemCard from '../sale-item-card/'
import ItemDetail from '../sale-item-detail/renderer'
import { sortOptions } from '../../constants'
import './index.css'

export default class SaleItemList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {},
        }
    }
    componentDidMount() {
        this.props.getSaleItems(this.props.subCategory);
        this.props.setItemType('sale')
    }
    componentWillUnmount() {
        this.props.setItemType('')
    }
    handleOpen = (item) => {
        this.setState({
            item: item,
        })
    }
    handleSortChange = (e, { value }) => {
        let itemsNewList = this.props.saleItems.slice()
        switch (value) {
            case 'price--low to high':
                itemsNewList.sort((a, b) => {
                    return a.cost - b.cost
                })
                this.props.sortItems(itemsNewList)
                break;
            case 'price--high to low':
                itemsNewList.sort((a, b) => {
                    return b.cost - a.cost
                })
                this.props.sortItems(itemsNewList)
                break;
            case 'latest':
                itemsNewList.sort((a, b) => {
                    return new Date(b.datetimeCreated) - new Date(a.datetimeCreated)
                })
                this.props.sortItems(itemsNewList)
                break;

        }
    }

    render() {
        return (
            <React.Fragment>
                <Grid.Column width={16} styleName='items-grid'>
                    <Grid padded={"vertically"}>
                        <Grid.Row>
                            <Grid.Column width={8} floated={'left'}>
                                <Breadcrumb>
                                    <Breadcrumb.Section link>Items for sale</Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right angle' />
                                    <Breadcrumb.Section active>All</Breadcrumb.Section>
                                </Breadcrumb>
                            </Grid.Column>
                            <Grid.Column width={8} floated={'right'}>
                                <Grid>
                                    <Grid.Column width={16} textAlign={'right'} verticalAlign={"middle"} >
                                        <Header as='h4'>
                                            <Header.Content>
                                                Sort By{' '}
                                                <Dropdown styleName="sort-dropdown" direction='left' onChange={this.handleSortChange} inline options={sortOptions} defaultValue={sortOptions[0].value} >
                                                </Dropdown>
                                            </Header.Content>
                                        </Header>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid divided={"vertically"} doubling columns={4}>
                                <Grid.Row stretched>
                                    {this.props.saleItems.map((item, index) => {
                                        return (
                                            <Modal key={index} trigger={
                                                <Grid.Column key={index}  >
                                                    <ItemCard item={item} onlick={this.handleOpen} />
                                                </Grid.Column>
                                            }
                                                closeIcon>
                                                <Modal.Content>
                                                    <Grid container styleName="dimmer-grid" >
                                                        <ItemDetail saleItemDetail={this.state.item} />
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
            </React.Fragment>
        )
    }
}