import React from 'react'
import { render } from 'react-dom'
import { Header, Grid, Modal, Radio, Divider, Table, List } from 'semantic-ui-react'
import { getTheme } from 'formula_one'
import SaleItemCard from '../sale-item-card/'
import SaleItemDetail from '../sale-item-detail/renderer'
import CustomModal from '../request-modal'
import './index.css'

export default class UserAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPhoneVisible: true
        }
    }
    componentDidMount() {
        this.props.getSaleItems()
        this.props.getRequestItems()
    }

    toggle = () => this.setState({ isPhoneVisible: !this.state.isPhoneVisible }, () => {
        let formData = new FormData()
        formData.append('phone_status', this.state.isPhoneVisible)
        this.props.changePhoneStatus(formData)
    })

    componentDidUpdate(prevProps) {
        let status = false
        const { userProducts } = this.props
        userProducts.request.map((item, ) => {
            if (item.isPhoneVisible) {
                status = true
            }
        })
        userProducts.sale.map((item, ) => {
            if (item.isPhoneVisible) {
                status = true
            }
        })
        if (status && !this.state.isPhoneVisible) {
            this.setState({
                isPhoneVisible: status
            })
        }
    }
    renderCategories = () => {
        const { categories } = this.props
        let categoryList = []
        categories.map((category, index) => {
            let subCategoryList = []
            category.subCategories.map((subCategory, index) => {
                subCategoryList.push(
                    <List.Item>
                        <List.Icon name='' />
                        <List.Content styleName='sub-cat'>
                            {subCategory.name}
                        </List.Content>
                    </List.Item>
                )
            })
            categoryList.push(
                <List.Item>
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
    render() {
        const { userProducts } = this.props
        return (
            <React.Fragment >
                <Grid.Column width={16} styleName='user-grid'>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column computer={3} tablet={4} mobile={4}>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={16}>
                                            <Header as='h3'>
                                                My mobile no.
                                                <Radio onChange={this.toggle} defaultChecked={this.state.isPhoneVisible} slider styleName='mobile-slider' />
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
                                                    return (
                                                        <Grid.Column key={index}  >
                                                            <Modal key={index} trigger={
                                                                <div>
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
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </React.Fragment >
        )
    }
}
