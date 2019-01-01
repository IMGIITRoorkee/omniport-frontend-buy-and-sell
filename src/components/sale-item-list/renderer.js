import React from 'react'
import { render } from 'react-dom'
import {
    Grid,
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
            page: 1,
            loading: false
        }
    }
    componentDidMount() {
        this.props.getSaleItems(this.props.subCategory, 1, true);
        this.props.setItemType('sale')
        window.addEventListener("scroll", () => {
            const { saleProductCount } = this.props
            const { page } = this.state
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight && saleProductCount > (page * 10)) {
                this.setState({
                    loading: true,
                    page: this.state.page + 1
                }, () => {
                    this.props.getSaleItems(this.props.activeSubCategory, this.state.page)
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
        const { breadcrumb } = this.props
        const { loading } = this.state
        return (
            <React.Fragment>
                <Grid.Column width={16} styleName='items-grid'>
                    <Grid padded={"vertically"}>
                        <Grid.Row>
                            <Grid.Column width={8} floated={'left'}>
                                {breadcrumb()}
                            </Grid.Column>
                            <Grid.Column width={8} floated={'right'}>
                                <Grid>
                                    <Grid.Column width={16} textAlign={'right'} verticalAlign={"middle"} >
                                        <Header as='h5'>
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
                            <Grid divided={"vertically"} doubling columns={5}>
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
                                <Grid.Row styleName={'loader'}>
                                    <Grid.Column width={16} padded={"vertically"}>
                                        {loading ?
                                            <Loader active />
                                            : null
                                        }
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </React.Fragment >
        )
    }
}