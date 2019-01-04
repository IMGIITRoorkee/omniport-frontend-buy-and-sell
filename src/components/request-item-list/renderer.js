import React from 'react'
import { render } from 'react-dom'
import {
    Grid,
    Table,
    Loader
} from 'semantic-ui-react'
import CustomModal from '../request-modal'
import { getTheme } from 'formula_one'
import './index.css'
export default class RequestItemList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    componentDidMount() {
        this.props.getRequestItems(this.props.activeSubCategory, 1, true)
        this.props.setItemType('request')
        this.props.setPageNo('request', 1)
        window.addEventListener("scroll", () => {
            const { requestProductCount, page } = this.props
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight && requestProductCount > (page * 10)) {
                this.setState({
                    loading: true,
                }, () => {
                    this.props.getRequestItems(this.props.activeSubCategory, page + 1)
                    this.props.setPageNo('request', page + 1)
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


    render() {
        const { requestItems, user, breadcrumb, deleteItem } = this.props
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
                                            <Table.HeaderCell width={6}>Item</Table.HeaderCell>
                                            <Table.HeaderCell width={6}>Maximum price</Table.HeaderCell>
                                            <Table.HeaderCell width={3} >Expiry date</Table.HeaderCell>
                                            <Table.HeaderCell width={1}></Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {requestItems.map((item, index) => {
                                            return (
                                                <CustomModal index={index} item={item} key={index} />
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