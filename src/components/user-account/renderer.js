import React from 'react'
import { render } from 'react-dom'
import { Header, Grid, Modal, Radio, Divider, Table, List, Segment } from 'semantic-ui-react'
import SaleItemCard from '../sale-item-card/'
import SaleItemDetail from '../sale-item-detail/renderer'
import CustomModal from '../request-modal'
import { getTheme } from 'formula_one'
import './index.css'

export default class UserAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            requestLoad: 1,
            saleLoad: 1
        }
    }
    componentDidMount() {
        this.props.getSaleItems(1, true)
        this.props.getRequestItems(1, true)
        this.setState({
            isPhoneVisible: this.props.user.isPhoneVisible
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.user.isPhoneVisible!== this.props.user.isPhoneVisible) {
            this.setState({
                isPhoneVisible: this.props.user.isPhoneVisible
            })
        }
    }
    toggle = () => this.setState({ isPhoneVisible: !this.state.isPhoneVisible }, () => {
        let formData = new FormData()
        formData.append('phone_status', this.state.isPhoneVisible)
        this.props.changePhoneStatus(formData)
    })
    renderCategories = () => {
        const { categories } = this.props
        let categoryList = []
        categories.map((category, index) => {
            let subCategoryList = []
            category.subCategories.map((subCategory, index) => {
                subCategoryList.push(
                    <List.Item key={subCategory.slug}>
                        <List.Icon name='' />
                        <List.Content styleName='sub-cat'>
                            {subCategory.name}
                        </List.Content>
                    </List.Item>
                )
            })
            categoryList.push(
                <List.Item key={category.slug}>
                    <List.Content>
                        <List.Header>{category.name}</List.Header>
                        {subCategoryList.length > 0 ?
                            <List.List>
                                {subCategoryList}
                            </List.List>
                            : null}
                    </List.Content>
                </List.Item>
            )
        })
        return (
            <List size='medium' styleName='category-list'>
                {categoryList}
            </List>
        )
    }
    requestLoader = () => {
        const { userProducts, getRequestItems } = this.props
        const { requestLoad } = this.state
        getRequestItems(requestLoad + 1, false)
        this.setState({
            requestLoad: requestLoad + 1
        })
    }
    saleLoader = () => {
        const { userProducts, getSaleItems } = this.props
        const { saleLoad } = this.state
        if (userProducts.sale.length <= 4 * (saleLoad + 1)) {
            getSaleItems((userProducts.sale.length / 10) + 1, false)
            this.setState({
                saleLoad: saleLoad + 1
            })
        }
        else {
            this.setState({
                saleLoad: saleLoad + 1
            })
        }

    }
    render() {
        const { userProducts, user } = this.props
        const { saleLoad, requestLoad, isPhoneVisible } = this.state
        return (
            <React.Fragment >
                {
                    user ?
                        <Grid.Column width={16} styleName='user-grid'>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column computer={3} tablet={4} mobile={4}>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column width={16}>
                                                    <Header as='h3'>
                                                        My mobile no.
                                                            <Radio onChange={this.toggle} checked={isPhoneVisible} slider />
                                                    </Header>
                                                </Grid.Column>
                                                <Grid.Column width={16}>
                                                    (decide whether people can see your phone number)
                                            <Divider />
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={16}>
                                                    <Header as='h3'>
                                                        Categories
                                            </Header>
                                                </Grid.Column>
                                                <Grid.Column width={16}>
                                                    {this.renderCategories()}
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
                                                            if (index < 4 * saleLoad)
                                                                return (
                                                                    <Grid.Column key={index}  >
                                                                        <Modal key={index} trigger={
                                                                            <div styleName='card-sale'>
                                                                                <SaleItemCard item={item} />
                                                                            </div>
                                                                        }
                                                                            closeIcon>
                                                                            <Modal.Content>
                                                                                <Grid container styleName="dimmer-grid" >
                                                                                    <SaleItemDetail saleItemDetail={item} />
                                                                                </Grid>
                                                                            </Modal.Content>
                                                                        </Modal>
                                                                    </Grid.Column>
                                                                )
                                                        })}
                                                    </Grid.Row>
                                                </Grid>
                                            </Grid.Row>
                                            {userProducts.saleCount > 4 * saleLoad ?
                                                <Grid.Row>
                                                    <Grid.Column width={16}>
                                                        <Segment onClick={this.saleLoader} styleName='load-more-sale' size='small' textAlign='center' attached><Header color={getTheme()} as='h4'>More</Header></Segment>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                : null
                                            }
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
                                                    <Table.HeaderCell width={6}>Item</Table.HeaderCell>
                                                    <Table.HeaderCell width={6}>Maximum price</Table.HeaderCell>
                                                    <Table.HeaderCell width={3} >Expiry date</Table.HeaderCell>
                                                    <Table.HeaderCell width={1}></Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                {userProducts.request.map((item, index) => {
                                                    return (
                                                        <CustomModal index={index} item={item} key={index} />
                                                    )
                                                })}
                                            </Table.Body>
                                        </Table>
                                    </Grid.Column>
                                    {userProducts.requestCount > 10 * requestLoad ?
                                        <Grid.Column width={16}>
                                            <Segment onClick={this.requestLoader} styleName='load-more' size='small' textAlign='center' attached><Header color={getTheme()} as='h4'>More</Header></Segment>
                                        </Grid.Column>
                                        : null
                                    }
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                        : null}
            </React.Fragment >
        )
    }
}
