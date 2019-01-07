import React from 'react'
import { render } from 'react-dom'
import { Grid, Placeholder, Visibility, Icon, Table, Popup } from 'semantic-ui-react'
import { formatDate, stringifyNumber } from '../../constants'
import CustomPopup from '../custom-popup'
import { getTheme } from 'formula_one'
import './index.css'

export default class RequestItemDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }
    componentDidMount() {
        if (!this.props.requestItemDetail.name) {
            const id = this.props.match.params.id
            this.props.getRequestItemDetail(`${id}/`)
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.match) {
            if (this.props.match.params.id !== prevProps.match.params.id) {
                const id = this.props.match.params.id
                this.props.getRequestItemDetail(`${id}/`)
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
    render() {
        const { requestItemDetail, modal } = this.props
        const { loading } = this.state
        return (requestItemDetail.name ?
            <Grid.Column width={16}>
                <Visibility fireOnMount onTopVisible={this.handleLoading}>
                </Visibility>
                <Grid divided="vertically" padded={"vertically"} relaxed="very" >
                    <Grid.Row centered>
                        <Grid.Column computer={modal ? 8 : 8} tablet={modal ? 8 : 8} mobile={14}>
                            <Grid textAlign="left">
                                <Grid.Row>
                                    {loading ?
                                        <Grid.Column width={16}>
                                            <Placeholder>
                                                <Placeholder.Header>
                                                    <Placeholder.Line />
                                                    <Placeholder.Line />
                                                </Placeholder.Header>
                                            </Placeholder>
                                        </Grid.Column>
                                        :
                                        <Grid.Column width={16} styleName='title-item'>
                                            <div styleName='title'>{requestItemDetail.name}</div>
                                            {!modal ?
                                                <CustomPopup detailView={true} type='request' item={requestItemDetail} />
                                                : null}
                                        </Grid.Column>
                                    }
                                </Grid.Row>
                                <Grid.Row>
                                    {loading ?
                                        <>
                                            <Grid.Column width={16}>
                                                <Placeholder>
                                                    <Placeholder.Header>
                                                        <Placeholder.Line />
                                                        <Placeholder.Line />
                                                    </Placeholder.Header>
                                                </Placeholder>
                                            </Grid.Column>
                                            <Grid.Column styleName='p-holder' width={16}>
                                                <Placeholder>
                                                    <Placeholder.Paragraph>
                                                        <Placeholder.Line />
                                                        <Placeholder.Line />
                                                        <Placeholder.Line />
                                                        <Placeholder.Line />
                                                        <Placeholder.Line />
                                                    </Placeholder.Paragraph>
                                                </Placeholder>
                                            </Grid.Column>
                                        </>
                                        :
                                        <Table unstackable styleName="item-data">
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell styleName='data-col'>
                                                        Maximum price
                                                </Table.Cell>
                                                    <Table.Cell styleName='data-col'>
                                                        <Icon name="rupee sign" size={'small'} />
                                                        {requestItemDetail.cost}
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell styleName='data-col'>
                                                        Expires On
                                                </Table.Cell>
                                                    <Table.Cell styleName='data-col'>
                                                        {formatDate(requestItemDetail.endDate)}
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell styleName='data-col'>
                                                        Requested by
                                                </Table.Cell>
                                                    <Table.Cell styleName='data-col'>
                                                        <Popup
                                                            trigger={<span>{requestItemDetail.person.person.fullName}</span>}
                                                        >
                                                            <Popup.Header>
                                                                {requestItemDetail.person.person.fullName}
                                                            </Popup.Header>
                                                            <Popup.Content>
                                                                <div styleName='popup-flex'>
                                                                    <img styleName='avtar' src={requestItemDetail.person.person.displayPicture} />
                                                                    <div>
                                                                        {requestItemDetail.person.branch ?
                                                                            <>
                                                                                <div>
                                                                                    {stringifyNumber(requestItemDetail.person.currentYear)}
                                                                                    {` year, ${requestItemDetail.person.branch.name}`}
                                                                                </div>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <div>
                                                                                    {`faculty, ${requestItemDetail.person.department.name}`}
                                                                                </div>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Popup.Content>
                                                        </Popup>
                                                    </Table.Cell>
                                                </Table.Row>
                                                {requestItemDetail.person.person.contactInformation.emailAddress ?
                                                    <Table.Row>
                                                        <Table.Cell styleName='data-col'>Email address</Table.Cell>
                                                        <Table.Cell styleName='data-col'>
                                                            {requestItemDetail.person.person.contactInformation.emailAddress}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                    : null
                                                }
                                                {requestItemDetail.isPhoneVisible && requestItemDetail.person.person.contactInformation.primaryPhoneNumber ?
                                                    <Table.Row>
                                                        <Table.Cell styleName='data-col'>Phone number</Table.Cell>
                                                        <Table.Cell styleName='data-col'>
                                                            {requestItemDetail.person.person.contactInformation.primaryPhoneNumber}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                    : null
                                                }
                                            </Table.Body>
                                        </Table>
                                    }
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
