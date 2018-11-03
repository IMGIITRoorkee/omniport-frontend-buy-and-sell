import React from 'react'
import { render } from 'react-dom'
import { Header, Grid, Divider, Image } from 'semantic-ui-react'
import './index.css'

export default class SaleItemDetail extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

        const id = this.props.match.params.id
        this.props.getSaleItemDetail(`${id}/`)
        console.log(this.props.saleItemDetail)

    }
    render() {
        return (this.props.saleItemDetail.name ?
            <Grid relaxed="very" styleName="dimmer-grid" >
                <Grid.Row>
                    <Grid.Column computer={8} tablet={8} mobile={16}>
                        <Image
                            as={() => {
                                return (
                                    <div styleName='item-img' style={{ background: `url(${this.props.saleItemDetail.pictures.length ? this.props.saleItemDetail.pictures[0] : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'})` }}>
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
                                    <Header as="h2">{this.props.saleItemDetail.name}</Header>
                                    <Divider fitted />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    {this.props.saleItemDetail.details}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid padded textAlign="left" columns="equal">
                                    <Grid.Row columns={2}>
                                        <Grid.Column>
                                            Price
                                                </Grid.Column>
                                        <Grid.Column>
                                            {this.props.saleItemDetail.cost}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row >
                                        <Grid.Column>
                                            Expires On
                                                </Grid.Column>
                                        <Grid.Column>
                                            {new Date(this.props.saleItemDetail.endDate).toDateString()}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row >
                                        <Grid.Column>
                                            Owner
                                                </Grid.Column>
                                        <Grid.Column>
                                            {/* {this.state.person.fullName} */}
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
        :null)
    }
}
