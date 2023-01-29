import React from 'react'
import { render } from 'react-dom'
import { isMobile } from 'react-device-detect'
import {
  Grid,
  Divider,
  Visibility,
  Placeholder,
  Icon,
  Table,
  Transition,
  Popup
} from 'semantic-ui-react'
import { formatDate, defaultImageUrl, stringifyNumber } from '../../constants'
import CustomPopup from '../custom-popup'
import './index.css'

export default class SaleItemDetail extends React.Component {
  state = {
    indicator: 0,
    loading: false
  }

  componentDidMount () {
    if (!this.props.saleItemDetail.name && this.props.match !== undefined) {
      const id = this.props.match.params.id
      this.props.getSaleItemDetail(`${id}/`)
    }
  }
  componentDidUpdate (prevProps) {
    if (this.props.match !== undefined) {
      if (this.props.match.params.id !== prevProps.match.params.id) {
        const id = this.props.match.params.id
        this.props.getSaleItemDetail(`${id}/`)
      }
    }
  }

  componentWillUnmount () {
    if (this.props.clearSaleItem) {
      this.props.clearSaleItem()
    }
  }

  handleLoading = () => {
    this.setState({ loading: true })
    this.timerHandle = setTimeout(() => {
      this.setState({
        loading: false
      })
      this.timerHandle = 0
    }, 500)
  }
  handleIndicator = index => {
    this.setState({
      indicator: index
    })
  }
  handleDecreaseIndex = index => {
    if(index > 0){
    this.setState({
      indicator: index-1
    })
  }
  }
  handleIncreaseIndex = (index, length) => {
    if(index < length - 1){
    this.setState({
      indicator: index+1
    })
  }
  }

  isOwner = itemUser => {
    const { user } = this.props
    if (user.person) {
      return user.person.id === itemUser.person.id
    }
    return false
  }

  render () {
    const { saleItemDetail, modal } = this.props
    const { loading } = this.state
    return saleItemDetail.name ? (
      <Grid.Column
        styleName={!modal ? 'detail-div' : 'detail-div-modal'}
        width={16}
      >
        <Visibility fireOnMount onTopVisible={this.handleLoading} />
        <Grid>
          <Grid.Row centered>
            <Grid.Column
              styleName='img-container'
              computer={8}
              tablet={8}
              mobile={14}
            >
              <Grid styleName='img-grid'>
                {loading ? (
                  <Grid.Row centered>
                    <Grid.Column width={14}>
                      <Placeholder>
                        <Placeholder.Image rectangular />
                      </Placeholder>
                    </Grid.Column>
                  </Grid.Row>
                ) : (
                  <>
                    <Grid.Row styleName='img-div'>
                      {saleItemDetail.pictures.length > 0 ? (
                        saleItemDetail.pictures.map((image, index) => {
                          return (
                            <Transition
                              key={index}
                              transitionOnMount
                              visible={this.state.indicator === index}
                              animation='scale'
                              duration={500}
                            >
                              <div
                                styleName='item-img'
                                style={{ background: `url(${image})` }}
                              >
                                <div styleName='swipe'>
                                  <div
                                   styleName='angle-container'
                                   onClick={() => this.handleDecreaseIndex(index)}
                                   styleName={`${
                                        this.state.indicator > 0
                                          ? ''
                                          : 'disactive-arrow'
                                      }`}
                                  >
                                    <Icon
                                      name='angle left'
                                    />
                                  </div>
                                  <div
                                   styleName='angle-container-right'
                                   onClick={() =>
                                    this.handleIncreaseIndex(index, saleItemDetail.pictures.length)}
                                    styleName={`${
                                      this.state.indicator < saleItemDetail.pictures.length - 1
                                        ? ''
                                        : 'disactive-arrow'
                                    }`}
                                  >
                                    <Icon
                                     name='angle right'
                                    />
                                  </div>
                                </div>
                              </div>
                            </Transition>
                          )
                        })
                      ) : (
                        <Transition
                          transitionOnMount
                          visible
                          animation='scale'
                          duration={500}
                        >
                          <div
                            styleName='item-img'
                            style={{ background: `url(${defaultImageUrl})` }}
                          />
                        </Transition>
                      )}
                    </Grid.Row>
                    <Grid.Row centered>
                      {saleItemDetail.pictures.length > 1
                        ? saleItemDetail.pictures.map((image, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => this.handleIndicator(index)}
                              styleName={`carousel-indicator ${
                                this.state.indicator === index
                                  ? 'active-indicator'
                                  : ''
                              }`}
                            />
                          )
                        })
                        : null}
                    </Grid.Row>
                  </>
                )}
              </Grid>
            </Grid.Column>
            <Grid.Column
              styleName='detail-grid'
              computer={8}
              tablet={8}
              mobile={14}
            >
              <Grid textAlign='left'>
                <Grid.Row styleName='title-row'>
                  <Grid.Column
                    width={16}
                    styleName={`title-item ${
                      isMobile ? 'title-item-mobile' : ''
                    }`}
                  >
                    {loading ? (
                      <Placeholder>
                        <Placeholder.Header>
                          <Placeholder.Line length='short' />
                        </Placeholder.Header>
                      </Placeholder>
                    ) : (
                      <>
                        <div styleName='title'>{saleItemDetail.name}</div>
                        {!modal && this.isOwner(saleItemDetail.person) ? (
                          <CustomPopup
                            detailView
                            type='buy'
                            item={saleItemDetail}
                          />
                        ) : null}
                      </>
                    )}
                  </Grid.Column>
                  {!loading ? (
                    <Grid.Column width={16}>
                      <Divider fitted />
                    </Grid.Column>
                  ) : null}
                </Grid.Row>
                {saleItemDetail.details ? (
                  <Grid.Row styleName='title-row'>
                    <Grid.Column width={16}>
                      {' '}
                      {loading ? (
                        <Placeholder>
                          <Placeholder.Paragraph>
                            <Placeholder.Line styleName='pholder-line' />
                            <Placeholder.Line styleName='pholder-line' />
                          </Placeholder.Paragraph>
                        </Placeholder>
                      ) : (
                        <>{saleItemDetail.details}</>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                ) : null}
                <Grid.Row>
                  {loading ? (
                    <Grid.Column width={16}>
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
                    </Grid.Column>
                  ) : (
                    <Table unstackable styleName='item-data'>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell styleName='data-col'>
                            {saleItemDetail.isRental ? 
                            <>Renting Rate</> :
                            <>Price</>
                            }
                            
                          </Table.Cell>
                          <Table.Cell styleName='data-col data-values'>
                            <Icon name='rupee sign' size={'small'} />
                            {saleItemDetail.isRental ? 
                            <>{saleItemDetail.cost} per {saleItemDetail.periodicity}</> :
                            <>{saleItemDetail.cost}</>
                            }
                            
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell styleName='data-col'>
                            Expires On
                          </Table.Cell>
                          <Table.Cell styleName='data-col data-values'>
                            {formatDate(saleItemDetail.endDate)}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell styleName='data-col'>Owner</Table.Cell>
                          <Table.Cell styleName='data-col data-values'>
                            <Popup
                              trigger={
                                <span>
                                  {saleItemDetail.person.person.fullName}
                                </span>
                              }
                            >
                              <Popup.Header>
                                {saleItemDetail.person.person.fullName}
                              </Popup.Header>
                              <Popup.Content>
                                <div styleName='popup-flex'>
                                  <img
                                    styleName='avtar'
                                    src={
                                      saleItemDetail.person.person
                                        .displayPicture
                                    }
                                  />
                                  <div>
                                    {saleItemDetail.person.branch ? (
                                      <>
                                        <div>
                                          {stringifyNumber(
                                            saleItemDetail.person.currentYear
                                          )}
                                          {` year, ${
                                            saleItemDetail.person.branch.name
                                          }`}
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div>
                                          {`faculty, ${
                                            saleItemDetail.person.department
                                              .name
                                          }`}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </Popup.Content>
                            </Popup>
                          </Table.Cell>
                        </Table.Row>
                        {saleItemDetail.person.person.contactInformation
                          .emailAddress ? (
                            <Table.Row>
                              <Table.Cell styleName='data-col'>
                              Email address
                              </Table.Cell>
                              <Table.Cell styleName='data-col data-values'>
                                {
                                  saleItemDetail.person.person.contactInformation
                                    .emailAddress
                                }
                              </Table.Cell>
                            </Table.Row>
                          ) : null}
                        {saleItemDetail.isPhoneVisible &&
                        saleItemDetail.person.person.contactInformation
                          .primaryPhoneNumber ? (
                            <Table.Row>
                              <Table.Cell styleName='data-col'>
                              Phone number
                              </Table.Cell>
                              <Table.Cell styleName='data-col data-values'>
                                {
                                  saleItemDetail.person.person.contactInformation
                                    .primaryPhoneNumber
                                }
                              </Table.Cell>
                            </Table.Row>
                          ) : null}
                        {saleItemDetail.paymentModes.length > 0 ? (
                          <Table.Row>
                            <Table.Cell styleName='data-col'>
                              Payment modes accepted
                            </Table.Cell>
                            <Table.Cell styleName='data-col data-values'>
                              {saleItemDetail.paymentModes.join(', ')}
                            </Table.Cell>
                          </Table.Row>
                        ) : null}
                        {saleItemDetail.warrantyDetail ? (
                          <Table.Row>
                            <Table.Cell styleName='data-col'>
                            {saleItemDetail.isRental ? 
                            <>Maximum Renting Period</> :
                            <>Warranty Details</>
                            }
                            </Table.Cell>
                            <Table.Cell styleName='data-col data-values'>
                              {saleItemDetail.warrantyDetail}
                            </Table.Cell>
                          </Table.Row>
                        ) : null}
                        {saleItemDetail.isRental ? (
                          <Table.Row>
                            <Table.Cell styleName='data-col'>
                            Security Deposit
                            </Table.Cell>
                            <Table.Cell styleName='data-col data-values'>
                              {saleItemDetail.securityDeposit===0 ? <>-</> : 
                              <>
                                <Icon name='rupee sign' size={'small'} />
                                {saleItemDetail.securityDeposit}
                              </>
                              }
                            </Table.Cell>
                          </Table.Row>
                        ) : null}
                      </Table.Body>
                    </Table>
                  )}
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    ) : null
  }
}
