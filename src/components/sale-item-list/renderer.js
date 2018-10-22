import React from 'react'
import { render } from 'react-dom'
import { Grid, Dimmer, Divider, Breadcrumb, Image, Card, Icon, Dropdown, Header } from 'semantic-ui-react'
import './index.css'

class ItemCard extends React.Component {

    render() {
        return (
            <Card onClick={() => this.props.onlick(this.props.item)}>
                <Image
                    as={() => {
                        return (
                            <div styleName='item-card-img' style={{ background: `url(${this.props.item.pictures.length ? this.props.item.pictures[0] : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'})` }}>

                            </div>
                        )
                    }
                    }
                    fluid />
                <Card.Content>
                    <Card.Header>{this.props.item.name}</Card.Header>
                    <Card.Meta>
                        <span className='date'><Icon name="rupee sign" size={'small'} />{this.props.item.cost}</span>
                    </Card.Meta>
                    <Card.Description>{this.props.item.details}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <span>
                        {new Date(this.props.item.datetimeCreated).toDateString()}
                    </span>
                </Card.Content>
            </Card>
        )
    }
}

let sortOptions = [
    {
        text: 'Latest',
        value: 'latest',
        Content: 'Latest'
    },
    {
        text: 'Price',
        value: 'price',
        Content: 'Price'
    }
]
export default class ItemList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
            item: {},
            person: {},
        }
    }
    componentDidMount() {
        if (this.props.saleItems.length == 0) {
            this.props.getSaleItems();
        }
    }
    handleOpen = (item) => {
        this.setState({
            active: true,
            item: item,
            person: item.person["person"],
        }, console.log(this.state.item))
    }
    handleClose = () => this.setState({
        active: false,

    })

    render() {
        return (
            <React.Fragment>
                <Grid padded={"verically"} styleName='items-grid'>
                    <Grid.Row>
                        <Grid.Column floated={'left'} width={6}>
                            <Breadcrumb>
                                <Breadcrumb.Section link>Items for sale</Breadcrumb.Section>
                                <Breadcrumb.Divider icon='right angle' />
                                <Breadcrumb.Section active>All</Breadcrumb.Section>
                            </Breadcrumb>
                        </Grid.Column>
                        <Grid.Column floated={'right'} computer={6} tablet={8} mobile={10}>
                            <Grid columns={2} centered>
                                <Grid.Column width={8} textAlign={'right'} verticalAlign={"middle"} >
                                    <span>
                                        Sort By
                                </span>
                                </Grid.Column  >
                                <Grid.Column >
                                    {' '}
                                    <Dropdown styleName="sort-dropdown" onChange={this.handleChange} inline options={sortOptions} defaultValue={sortOptions[0].value} >
                                    </Dropdown>
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid divided={"vertically"} doubling columns={5}>
                            <Grid.Row stretched>
                                {this.props.saleItems.map((item, index) => {
                                    return (
                                        <Grid.Column >
                                            <ItemCard item={item} onlick={this.handleOpen} />
                                        </Grid.Column>
                                    )
                                })}
                            </Grid.Row>
                        </Grid>

                    </Grid.Row>
                </Grid>
                <Dimmer active={this.state.active} onClickOutside={this.handleClose} page>
                    <Grid relaxed="very" styleName="dimmer-grid" >
                        <Grid.Row>
                            <Grid.Column computer={8} tablet={8} mobile={16}>
                                <Image
                                    as={() => {
                                        return (
                                            <div styleName='item-img' style={{ background: `url(${this.state.item.pictures.length ? this.state.item.pictures[0] : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'})` }}>
                                            </div>
                                        )
                                    }
                                    }
                                    fluid />
                            </Grid.Column>
                            <Grid.Column computer={8} tablet={8} mobile={16}>
                                <Grid textAlign="left">
                                    <Grid.Row>
                                        <Grid.Column width={16}>
                                            <Header as="h2">{this.state.item.name}</Header>
                                            <Divider fitted />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={16}>
                                            {this.state.item.details}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid padded textAlign="left" columns="equal">
                                            <Grid.Row columns={2}>
                                                <Grid.Column>
                                                    Price
                                                </Grid.Column>
                                                <Grid.Column>
                                                    {this.state.item.cost}
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row >
                                                <Grid.Column>
                                                    Expires On
                                                </Grid.Column>
                                                <Grid.Column>
                                                    {new Date(this.state.item.endDate).toDateString()}
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row >
                                                <Grid.Column>
                                                    Owner
                                                </Grid.Column>
                                                <Grid.Column>
                                                    {this.state.person.fullName}
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row >
                                                <Grid.Column>

                                                </Grid.Column>
                                                <Grid.Column>

                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row >
                                                <Grid.Column>

                                                </Grid.Column>
                                                <Grid.Column>

                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Dimmer>
            </React.Fragment>
        )
    }
}