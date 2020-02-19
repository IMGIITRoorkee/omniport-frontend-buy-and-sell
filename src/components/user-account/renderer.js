import React from 'react'
import { render } from 'react-dom'
import {isMobile} from 'react-device-detect';
import {
  Placeholder,
  Header,
  Responsive,
  Grid,
  Modal,
  Radio,
  Divider,
  Table,
  List,
  Segment,
  Loader
} from 'semantic-ui-react'
import SaleItemCard from '../sale-item-card/'
import SaleItemDetail from '../sale-item-detail/renderer'
import CustomModal from '../request-row'
import { getTheme, DefaultDP } from 'formula_one'
import './index.css'

export default class UserAccount extends React.Component {
    state = {
      requestLoad: 1,
      saleLoad: 1,
      loading: true,
    }

  componentDidMount () {
    this.props.getSaleItems(1, true)
    this.props.getRequestItems(1, true)
    this.setState({
      isPhoneVisible: this.props.user.isPhoneVisible
    })
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1000)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.user.isPhoneVisible !== this.props.user.isPhoneVisible) {
      this.setState({
        isPhoneVisible: this.props.user.isPhoneVisible
      })
    }
  }

  toggle = () =>
    this.setState({ isPhoneVisible: !this.state.isPhoneVisible }, () => {
      this.props.changePhoneStatus(this.state.isPhoneVisible)
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
            <List.Content styleName='sub-cat'>{subCategory.name}</List.Content>
          </List.Item>
        )
      })
      categoryList.push(
        <List.Item key={category.slug}>
          <List.Content>
            <List.Header>{category.name}</List.Header>
            {subCategoryList.length > 0 ? (
              <List.List>{subCategoryList}</List.List>
            ) : null}
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
    const { getRequestItems } = this.props
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
      getSaleItems(userProducts.sale.length / 10 + 1, false)
      this.setState({
        saleLoad: saleLoad + 1
      })
    } else {
      this.setState({
        saleLoad: saleLoad + 1
      })
    }
  }

  render () {
    const { userProducts, user, loaders } = this.props
    const { saleLoad, loading, requestLoad, isPhoneVisible } = this.state
    return (
      <React.Fragment>
        {user.person ? (
          <Grid.Column width={16} styleName='user-grid'>

            <Grid>
              <Grid.Row>
              <Responsive
                as={React.Fragment}
                minWidth={Responsive.onlyTablet.maxWidth + 1}
              >
                <Grid.Column width={3}>
                  <Grid>
                    {loading ? (
                      <Grid.Row>
                        <Grid.Column width={16}>
                          <Placeholder>
                            <Placeholder.Image
                              styleName='p-holder-img'
                              square
                            />
                            <Placeholder.Header styleName='p-holder-h'>
                              <Placeholder.Line styleName='p-holder' />
                              <Placeholder.Line styleName='p-holder' />
                            </Placeholder.Header>
                          </Placeholder>
                        </Grid.Column>
                      </Grid.Row>
                    ) : (
                      <>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            {user.person ? (
                              user.person.displayPicture ? (
                                <div
                                  styleName='person-img'
                                  style={{
                                    background: `url(${
                                      user.person.displayPicture
                                    })`
                                  }}
                                />
                              ) : (
                                <DefaultDP
                                  name={user.person.fullName}
                                  size={'3em'}
                                />
                              )
                            ) : (
                              <DefaultDP
                                name={user.person.fullName}
                                size={'3em'}
                              />
                            )}
                          </Grid.Column>
                          <Grid.Column width={16}>
                            <div styleName='user-name'>
                              {user.person.fullName}
                            </div>
                              <div styleName='user-role'>
                                {user.person.roles.map((role, i) => {
                                  return `${role.role}${
                                    i != user.person.roles.length - 1 ? ', ' : ''
                                  }`
                                })}
                              </div>
                            <div styleName='user-contact user-contact-email'>
                              {user.person.contactInformation.emailAddress}
                            </div>
                            <div styleName='user-contact'>
                              {user.person.contactInformation.primaryPhoneNumber}
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <Header as='h4'>
                              Mobile No.
                              <Radio
                                styleName='slide'
                                onChange={this.toggle}
                                checked={isPhoneVisible}
                                slider
                              />
                            </Header>
                          </Grid.Column>
                          <Grid.Column width={16}>
                            (decide whether people can see your mobile number)
                          </Grid.Column>
                        </Grid.Row>
                      </>
                    )}
                  </Grid>
                </Grid.Column>
                </Responsive>
                <Responsive
                          as={React.Fragment}
                          maxWidth={Responsive.onlyTablet.maxWidth }
                        >
                        <Grid.Column width={16}>
                  <Grid>
                        <Grid.Row>
                          {user.person ? (
                              user.person.displayPicture ? (
                                <div
                                  styleName='person-img-mobile'
                                  style={{
                                    background: `url(${
                                      user.person.displayPicture
                                    })`
                                  }}
                                />
                              ) : (
                                <div
                                  styleName='person-img-mobile'
                                >
                                <DefaultDP
                                  name={user.person.fullName}
                                  size={'2em'}
                                />
                                </div>
                              )
                            ) : (
                              <div
                                  styleName='person-img-mobile'
                              >
                              <DefaultDP
                              styleName='person-img-mobile'
                                name={user.person.fullName}
                                size={'2em'}
                              />
                              </div>
                            )}
                          <Grid.Column computer={16} mobile={4} tablet={4}>
                            <div styleName='user-name-mobile'>
                              {user.person.fullName}
                            </div>
                            <div styleName='user-contact user-contact-email'>
                              {user.person.contactInformation.emailAddress}
                            </div>
                            <div styleName='user-contact'>
                              {user.person.contactInformation.primaryPhoneNumber}
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={16}>
                          <div styleName='mobile-visibility-mobile'>
                              Mobile No. Visibility
                              <Radio
                                styleName='slide'
                                onChange={this.toggle}
                                checked={isPhoneVisible}
                                slider
                              />
                          </div>
                          </Grid.Column>
                          <Grid.Column width={16} styleName='mobile-visibility-detail-mobile'>
                            (decide whether people can see your mobile number)
                          </Grid.Column>
                        </Grid.Row>
                  </Grid>
                </Grid.Column>
                        </Responsive>
                <Grid.Column
                  styleName={isMobile? 'account-body-mobile':'account-body'}
                  computer={13}
                  mobile={16}
                  tablet={16}
                >
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <Header as='h3'>Your Account</Header>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Header as='h4' styleName='item-heading'>
                          Items added for sale
                          <Divider fitted />
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered={isMobile} styleName='sale-row'>
                      <Grid divided={'vertically'} stackable columns={4}>
                        <Grid.Row stretched>
                          {userProducts.sale.map((item, index) => {
                            if (index < 4 * saleLoad) {
                              return (
                                <Grid.Column key={index}>
                                  <Modal
                                    key={index}
                                    trigger={
                                      <div styleName='card-sale'>
                                        <SaleItemCard item={item} />
                                      </div>
                                    }
                                    closeIcon
                                  >
                                    <Modal.Content>
                                      <Grid container styleName='dimmer-grid'>
                                        <SaleItemDetail
                                          modal
                                          saleItemDetail={item}
                                        />
                                      </Grid>
                                    </Modal.Content>
                                  </Modal>
                                </Grid.Column>
                              )
                            }
                          })}
                          {userProducts.sale.length === 0 && !loaders.userSaleList? (
                            <Grid.Column styleName='no-items' width={16}>
                              You haven't added any Item for Sale.
                            </Grid.Column>
                          ) : null}
                        </Grid.Row>
                      </Grid>
                    </Grid.Row>
                    {userProducts.saleCount > 4 * saleLoad ? (
                      <Grid.Row>
                        <Grid.Column width={16}>
                          <Segment
                            onClick={this.saleLoader}
                            styleName='load-more-sale'
                            size='small'
                            textAlign='center'
                            attached
                          >
                            <Header color={getTheme()} as='h4'>
                              {loaders.userSaleList ? (
                                <Loader inline active size='small' />
                              ) : (
                                <>More</>
                              )}
                            </Header>
                          </Segment>
                        </Grid.Column>
                      </Grid.Row>
                    ) : null}
                  </Grid>
                  <Grid.Row styleName='request-head'>
                    <Grid.Column>
                      <Header as='h4' styleName='item-heading'>
                        Items requested
                        <Divider fitted />
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={16}>
                        <Table unstackable selectable>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell width={6}>
                                Item Name
                              </Table.HeaderCell>
                              <Responsive
                                as={React.Fragment}
                                minWidth={Responsive.onlyTablet.maxWidth + 1}
                              >
                              <Table.HeaderCell width={6}>
                                Maximum price
                              </Table.HeaderCell>
                              <Table.HeaderCell width={3}>
                                Expiry date
                              </Table.HeaderCell>
                              </Responsive>
                              <Table.HeaderCell width={1} />
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            {userProducts.request.map((item, index) => {
                              return (
                                <CustomModal
                                  index={index}
                                  item={item}
                                  key={index}
                                />
                              )
                            })}
                          </Table.Body>
                        </Table>
                      {userProducts.request.length === 0 && !loaders.userRequestList ? (
                        <Grid.Column styleName='no-items' width={16}>
                          You haven't added any Item for Request.
                        </Grid.Column>
                      ) : null}
                    </Grid.Column>
                    {userProducts.requestCount > 10 * requestLoad ? (
                      <Grid.Column width={16}>
                        <Segment
                          onClick={this.requestLoader}
                          styleName='load-more'
                          size='small'
                          textAlign='center'
                          attached
                        >
                          <Header color={getTheme()} as='h4'>
                            {loaders.userRequestList ? (
                              <Loader inline active size='small' />
                            ) : (
                              <>More</>
                            )}
                          </Header>
                        </Segment>
                      </Grid.Column>
                    ) : null}
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        ) : null}
      </React.Fragment>
    )
  }
}
