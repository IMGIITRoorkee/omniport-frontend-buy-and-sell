import React from 'react'
import { render } from 'react-dom'
import {
  Grid,
  Dropdown,
  Header,
  Modal,
  Loader,
  Divider
} from 'semantic-ui-react'
import { isMobile } from 'react-device-detect'
import ItemCard from '../sale-item-card/'
import ItemDetail from '../sale-item-detail/renderer'
import { sortOptions } from '../../constants'
import './index.css'

export default class SaleItemList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  onScroll = () => {
    const { saleProductCount, page } = this.props
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 1 &&
      saleProductCount > page * 10
    ) {
      this.setState(
        {
          loading: true
        },
        () => {
          this.props.getSaleItems(this.props.activeSubCategory, 1 + page)
          this.props.setPageNo('sale', page + 1)
          this.timerHandle = setTimeout(() => {
            this.setState({
              loading: false
            })
            this.timerHandle = 0
          }, 300)
        }
      )
    }
  }
  componentDidMount () {
    this.props.getSaleItems(this.props.activeSubCategory, 1, true)
    this.props.setItemType('sale')
    this.props.setPageNo('sale', 1)
    window.addEventListener('scroll', this.onScroll, false)
  }
  componentWillUnmount () {
    if (this.timerHandle) {
      // ***
      clearTimeout(this.timerHandle) // ***
      this.timerHandle = 0 // ***
    }
    window.removeEventListener('scroll', this.onScroll, false)
  }
  handleSortChange = (e, { value }) => {
    let itemsNewList = this.props.saleItems.slice()
    switch (value) {
      case 'price: low to high':
        itemsNewList.sort((a, b) => {
          return a.cost - b.cost
        })
        this.props.sortItems(itemsNewList)
        break
      case 'price: high to low':
        itemsNewList.sort((a, b) => {
          return b.cost - a.cost
        })
        this.props.sortItems(itemsNewList)
        break
      case 'latest':
        itemsNewList.sort((a, b) => {
          return new Date(b.datetimeCreated) - new Date(a.datetimeCreated)
        })
        this.props.sortItems(itemsNewList)
        break
    }
  }

  render () {
    const { breadcrumb } = this.props
    const { loading } = this.state
    return (
      <React.Fragment>
        <Grid.Column width={16} styleName='items-grid'>
          <Grid padded>
            <Grid.Row>
              <Grid.Column
                computer={8}
                tablet={16}
                mobile={16}
                floated={'left'}
              >
                {breadcrumb()}
              </Grid.Column>
              <Grid.Column
                computer={8}
                textAlign={`${isMobile ? 'left' : 'right'}`}
                mobile={16}
                tablet={16}
              >
                <Grid>
                  <Grid.Column
                    width={16}
                    styleName={isMobile ? 'sort-mobile' : ''}
                    verticalAlign={'middle'}
                  >
                    <Header as='h5'>
                      <Header.Content>
                        Sort By{' '}
                        <Dropdown
                          styleName='sort-dropdown'
                          direction='left'
                          onChange={this.handleSortChange}
                          inline
                          options={sortOptions}
                          defaultValue={sortOptions[0].value}
                        />
                      </Header.Content>
                    </Header>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid divided={'vertically'} stackable columns={5}>
                <Grid.Row stretched>
                  {this.props.saleItems.map((item, index) => {
                    return (
                      <Grid.Column stretched key={index}>
                        <Modal
                          key={index}
                          trigger={
                            <div styleName={`card-div`}>
                              <ItemCard item={item} />
                            </div>
                          }
                          closeIcon
                        >
                          <Modal.Content>
                            <Grid container styleName='dimmer-grid'>
                              <ItemDetail modal saleItemDetail={item} />
                            </Grid>
                          </Modal.Content>
                        </Modal>
                      </Grid.Column>
                    )
                  })}
                  {this.props.saleItems.length == 0 ? (
                    <Grid.Column styleName='no-items' width={16}>
                      No items to show
                    </Grid.Column>
                  ) : null}
                </Grid.Row>
                <Grid.Row centered styleName={'loader'}>
                  <Grid.Column width={16} padded={'vertically'}>
                    <Divider hidden fitted />
                    {loading ? <Loader active /> : null}
                    <Divider hidden fitted />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </React.Fragment>
    )
  }
}
