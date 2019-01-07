import React from 'react'
import { render } from 'react-dom'
import { Grid, Visibility, Placeholder, Icon, Table, Transition, Popup } from 'semantic-ui-react'
import { formatDate, defaultImageUrl, stringifyNumber } from '../../constants'
import CustomPopup from '../custom-popup'
import { getTheme } from 'formula_one'
import './index.css'

export default class SaleItemDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            indicator: 0,
            loading: false,
        }
    }
    componentDidMount() {
        if (!this.props.saleItemDetail.name && this.props.match !== undefined) {
            const id = this.props.match.params.id
            this.props.getSaleItemDetail(`${id}/`)
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.match !== undefined) {
            if (this.props.match.params.id !== prevProps.match.params.id) {
                const id = this.props.match.params.id
                this.props.getSaleItemDetail(`${id}/`)
            }
        }
    }
    handleLoading = () => {
        this.setState({ loading: true })
        this.timerHandle = setTimeout(() => {
            this.setState({
                loading: false
            });
            this.timerHandle = 0;
        }, 500);
    }
    handleIndicator = (index) => {
        this.setState({
            indicator: index
        })
    }
    render() {
        const { saleItemDetail, modal } = this.props
        const { loading } = this.state
        return (saleItemDetail.name ?
            <Grid.Column styleName='detail-div' width={16}>
                <Grid divided="vertically" padded={"vertically"} relaxed="very" >
                    <Grid.Row centered>
                        <Visibility fireOnMount onTopVisible={this.handleLoading}>
                        </Visibility>
                        <Grid.Column styleName="img-container" computer={8} tablet={8} mobile={14}>
                            <Grid styleName="img-grid">
                                {loading ?
                                    <Grid.Row centered>
                                        <Grid.Column width={14}>
                                            <Placeholder>
                                                <Placeholder.Image rectangular />
                                            </Placeholder>
                                        </Grid.Column>
                                    </Grid.Row>
                                    :
                                    <>
                                        <Grid.Row styleName="img-div">

                                            {saleItemDetail.pictures.length > 0 ?
                                                saleItemDetail.pictures.map((image, index) => {
                                                    return (
                                                        <Transition key={index} transitionOnMount visible={this.state.indicator == index ? true : false} animation='scale' duration={500}>
                                                            <div styleName='item-img' style={{ background: `url(${image})` }}>
                                                            </div>
                                                        </Transition>
                                                    )
                                                })
                                                :
                                                <Transition transitionOnMount visible={true} animation='scale' duration={500}>
                                                    <div styleName='item-img' style={{ background: `url(${defaultImageUrl})` }}>
                                                    </div>
                                                </Transition>
                                            }
                                        </Grid.Row>
                                        < Grid.Row centered>
                                            {saleItemDetail.pictures.length > 1 ?
                                                saleItemDetail.pictures.map((image, index) => {
                                                    return (
                                                        <div key={index} onClick={() => this.handleIndicator(index)} styleName={`carousel-indicator ${this.state.indicator == index ? 'active-indicator' : ''}`}>
                                                        </div>
                                                    )
                                                })
                                                : null
                                            }
                                        </Grid.Row>
                                    </>
                                }
                            </Grid>
                        </Grid.Column>
                        <Grid.Column computer={8} tablet={8} mobile={14}>
                            <Grid textAlign="left">
                                <Grid.Row>
                                    <Grid.Column width={16} styleName='title-item'>
                                        {loading ?
                                            <Placeholder>
                                                <Placeholder.Header>
                                                    <Placeholder.Line length='short'></Placeholder.Line>
                                                </Placeholder.Header>
                                            </Placeholder>
                                            :
                                            <>
                                                <div styleName='title'>{saleItemDetail.name}</div>
                                                {!modal ?
                                                    <CustomPopup detailView={true} type='buy' item={saleItemDetail} />
                                                    : null}
                                            </>
                                        }
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>                                        {loading ?
                                        <Placeholder>
                                            <Placeholder.Paragraph>
                                                <Placeholder.Line styleName='pholder-line' />
                                                <Placeholder.Line styleName='pholder-line' />
                                            </Placeholder.Paragraph>
                                        </Placeholder>
                                        :
                                        <>{saleItemDetail.details}</>
                                    }
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Table styleName="item-data">
                                        {loading ?
                                            <Placeholder styleName='table-p'>
                                                <Placeholder.Paragraph>
                                                    <Placeholder.Line styleName='pholder-line' />
                                                    <Placeholder.Line styleName='pholder-line' />
                                                    <Placeholder.Line styleName='pholder-line' />
                                                    <Placeholder.Line styleName='pholder-line' />
                                                    <Placeholder.Line styleName='pholder-line' />
                                                    <Placeholder.Line styleName='pholder-line' />

                                                </Placeholder.Paragraph>
                                            </Placeholder>
                                            :
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell styleName='data-col'>
                                                        Price
                                                </Table.Cell>
                                                    <Table.Cell styleName='data-col'>
                                                        <Icon name="rupee sign" size={'small'} />
                                                        {saleItemDetail.cost}
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell styleName='data-col'>
                                                        Expires On
                                                </Table.Cell>
                                                    <Table.Cell styleName='data-col'>
                                                        {formatDate(saleItemDetail.endDate)}
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell styleName='data-col'>
                                                        Owner
                                                </Table.Cell>
                                                    <Table.Cell styleName='data-col'>
                                                        <Popup
                                                            trigger={<span>{saleItemDetail.person.person.fullName}</span>}
                                                        >
                                                            <Popup.Header>
                                                                {saleItemDetail.person.person.fullName}
                                                            </Popup.Header>
                                                            <Popup.Content>
                                                                <div styleName='popup-flex'>
                                                                    <img styleName='avtar' src={saleItemDetail.person.person.displayPicture} />
                                                                    <div>
                                                                        {saleItemDetail.person.branch ?
                                                                            <>
                                                                                <div>
                                                                                    {stringifyNumber(saleItemDetail.person.currentYear)}
                                                                                    {` year, ${saleItemDetail.person.branch.name}`}
                                                                                </div>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <div>
                                                                                    {`faculty, ${saleItemDetail.person.department.name}`}
                                                                                </div>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Popup.Content>
                                                        </Popup>
                                                    </Table.Cell>
                                                </Table.Row>
                                                {saleItemDetail.person.person.contactInformation.emailAddress ?
                                                    <Table.Row>
                                                        <Table.Cell styleName='data-col'>Email address</Table.Cell>
                                                        <Table.Cell styleName='data-col'>
                                                            {saleItemDetail.person.person.contactInformation.emailAddress}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                    : null
                                                }
                                                {saleItemDetail.isPhoneVisible && saleItemDetail.person.person.contactInformation.primaryPhoneNumber ?
                                                    <Table.Row>
                                                        <Table.Cell styleName='data-col'>Phone number</Table.Cell>
                                                        <Table.Cell styleName='data-col'>
                                                            {saleItemDetail.person.person.contactInformation.primaryPhoneNumber}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                    : null
                                                }
                                                {saleItemDetail.paymentModes.length > 0 ?
                                                    <Table.Row>
                                                        <Table.Cell styleName='data-col'>
                                                            Payment modes accepted
                                                </Table.Cell>
                                                        <Table.Cell styleName='data-col'>
                                                            {saleItemDetail.paymentModes.join(', ')}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                    : null}
                                                {saleItemDetail.warrantyDetail ?
                                                    <Table.Row>
                                                        <Table.Cell styleName='data-col'>
                                                            Warranty (no. of months left)
                                                </Table.Cell>
                                                        <Table.Cell styleName='data-col'>
                                                            {saleItemDetail.warrantyDetail}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                    : null
                                                }
                                            </Table.Body>
                                        }
                                    </Table>
                                </Grid.Row>
                                {/* <Grid.Row styleName='enquire-flex'>
                                    <Button content='Enquire' color={getTheme()} />
                                </Grid.Row> */}
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column >
            : null)
    }
}
