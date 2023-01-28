import React from 'react'
import { render } from 'react-dom'
import {
  Grid,
  Dropdown,
  Header,
  Modal,
  Loader,
  Divider,
  Visibility,
  Checkbox
} from 'semantic-ui-react'
import { isMobile } from 'react-device-detect'
import ItemCard from '../sale-item-card/'
import ItemDetail from '../sale-item-detail/renderer'
import { sortOptions } from '../../constants'
import { getTheme } from 'formula_one'
import './index.css'
import { setFilter } from '../../reducers/set-filter'

export default class SaleItemList extends React.Component {
  state = {
    bottom: true,
    sort: 'latest',
    checkbox: {
      saleCheck: true,
      rentCheck:true
    },
    filter: '',
    
  }

  componentDidMount () {
    const {
      getSaleItems,
      setItemType,
      setPageNo,
      activeSubCategory,
      setFilter, 
      activeFilter
    } = this.props
    const {filter} = this.state
    {console.log(activeSubCategory + "hello")}
    // const args = activeSubCategory + '/' + activeFilter
    getSaleItems(activeSubCategory, activeFilter, 1, true)
    setItemType('sale')
    setPageNo('sale', 1)
    // setFilter('')
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
    const { saleProductCount, page, activeSubCategory, activeFilter } = this.props
    const {filter} = this.state
    if (saleProductCount > page * 10) {
      this.props.getSaleItems(activeSubCategory, activeFilter, 1 + page)
      this.props.setPageNo('sale', page + 1)
      this.handleSortChange(null, {value: this.props.sortingOrder})
    } else {
      this.setState({
        bottom: false
      })
    }
  }
  
handleFilter = () => {
  const {
    setFilter, 
    activeFilter, 
    getSaleItems, 
    page,
    activeSubCategory
  } = this.props
  
  if(this.state.checkbox.saleCheck && 
    !this.state.checkbox.rentCheck
  ) {
    
    setFilter('for_sale')
    getSaleItems(activeSubCategory, 'for_sale', 1, true)

  }
  else if(!this.state.checkbox.saleCheck && 
    this.state.checkbox.rentCheck
  ) {
    
    setFilter('for_rent')
    getSaleItems(activeSubCategory, 'for_rent', 1, true)
  }
  else {
    
    setFilter('')
    getSaleItems(activeSubCategory, '', 1, true)
  }
  console.log(this.props.activeFilter)
  
  // this.handleAfterFilterChange()
  

}  

  handleCheckboxChange = (e) => {
    const { name } = e.target;

    this.setState((prevState) => {
      return {
        checkbox: {
          ...prevState.checkbox,
          [name]: !prevState.checkbox[name]
        }
      };
    }, () => this.handleFilter());
    
    
  };

  render () {
    const { bottom } = this.state
    const { breadcrumb, loading, saleItems } = this.props
    {console.log(this.state.checkbox.saleCheck + "and" + this.state.checkbox.rentCheck)}
    {console.log(this.props.activeFilter + "h")}
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
                    <Header as='h5' styleName='filter'>
                      <Header.Content>
                        <Checkbox 
                          id='1'
                          label='For Sale'
                          name='saleCheck'
                          checked={this.state.checkbox.saleCheck}
                          onChange={this.handleCheckboxChange}
                        />
                        <Checkbox 
                          id='2'
                          label='For Rent' 
                          styleName='checkbox'
                          name='rentCheck'
                          checked={this.state.checkbox.rentCheck}
                          onChange={this.handleCheckboxChange}
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
                  {/* {console.log(saleItems)} */}
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
