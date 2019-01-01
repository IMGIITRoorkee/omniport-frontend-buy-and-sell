import React from 'react'
import { render } from 'react-dom'
import { Header, Grid, Button, Divider, Icon, Table, Popup, Image, GridColumn } from 'semantic-ui-react'
import { formatDate, stringifyNumber } from '../../constants'
import { getTheme } from 'formula_one'
import './index.css'

export default class RequestItemDetail extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        if (!this.props.requestItemDetail.name) {
            const id = this.props.match.params.id
            this.props.getRequestItemDetail(`${id}/`)
        }
    }
    render() {
        const { requestItemDetail, modal } = this.props
        return (requestItemDetail.name ?
            <Grid.Column width={16}>
                <Grid divided="vertically" padded={"vertically"} relaxed="very" >
                    <Grid.Row centered>
                        <Grid.Column computer={modal ? 8 : 8} tablet={modal ? 8 : 8} mobile={14}>
                            <Grid textAlign="left">
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Header as="h2" styleName='title'>{requestItemDetail.name}</Header>
                                        <Divider fitted />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
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
                                            {requestItemDetail.isPhoneVisible ?
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
                                </Grid.Row>
                                <Grid.Row styleName='enquire-flex'>
                                    <Button content='Enquire' color={getTheme()} />
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column >
            : null)
    }
}
