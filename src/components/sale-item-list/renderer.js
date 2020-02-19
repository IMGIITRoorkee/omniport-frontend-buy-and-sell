import React from 'react'
import { render } from 'react-dom'
import {
  Grid,
  Dropdown,
  Header,
  Modal,
  Loader,
  Divider,
  Visibility
} from 'semantic-ui-react'
import { isMobile } from 'react-device-detect'
import ItemCard from '../sale-item-card/'
import ItemDetail from '../sale-item-detail/renderer'
import { sortOptions } from '../../constants'
import { getTheme } from 'formula_one'
import './index.css'

export default class SaleItemList extends React.Component {
  state = {
    bottom: true,
    sort: 'latest'
  }

  componentDidMount () {
    const {
      getSaleItems,
      setItemType,
      setPageNo,
      activeSubCategory
    } = this.props
    getSaleItems(activeSubCategory, 1, true)
    setItemType('sale')
    setPageNo('sale', 1)
  }

  componentDidUpdate (prevProps) {
    if (this.props.activeSubCategory !== prevProps.activeSubCategory) {
      this.setState({
        bottom: true,
        sort: 'latest',
      })
    }
    if(this.state.sort !== this.props.sortingOrder && this.props.saleItems.length > 0)
    {
      this.handleSortChange(null, {value: this.props.sortingOrder});
    }
  }

  handleSortChange = (e, { value }) => {
    this.props.setSortingOrder(value)
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
    this.setState({sort: value})
  }

  handleUpdate = () => {
    const { saleProductCount, page, activeSubCategory } = this.props
    if (saleProductCount > page * 10) {
      this.props.getSaleItems(activeSubCategory, 1 + page)
      this.props.setPageNo('sale', page + 1)
      this.handleSortChange(null, {value: this.props.sortingOrder})
    } else {
      this.setState({
        bottom: false
      })
    }
  }

  render () {
    const { bottom } = this.state
    const { breadcrumb, loading, saleItems } = this.props
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
                  {saleItems.map((item, index) => {
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
                  {saleItems.length === 0 && loading === false ? (
                    <Grid.Column styleName='no-items' width={16}>
                      No items to show
                    </Grid.Column>
                  ) : null}
                </Grid.Row>
                {bottom ? (
                  <Grid.Row centered styleName={'loader'}>
                    <Grid.Column width={16} padded={'vertically'}>
                      <Visibility
                        once={false}
                        onBottomVisible={() => this.handleUpdate()}
                      />
                      <Divider hidden fitted />
                      {loading ? <Loader active /> : null}
                      <Divider hidden fitted />
                    </Grid.Column>
                  </Grid.Row>
                ) : null}
              </Grid>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </React.Fragment>
    )
  }
}
