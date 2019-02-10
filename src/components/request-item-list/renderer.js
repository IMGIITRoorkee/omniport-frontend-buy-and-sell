import React from 'react'
import { render } from 'react-dom'
import {
  Grid,
  Responsive,
  Visibility,
  Table,
  Loader,
  Placeholder
} from 'semantic-ui-react'
import { isMobile } from 'react-device-detect'
import CustomModal from '../request-row'
import { getTheme } from 'formula_one'
import './index.css'
export default class RequestItemList extends React.Component {
  componentDidMount () {
    this.props.getRequestItems(this.props.activeSubCategory, 1, true)
    this.props.setItemType('request')
    this.props.setPageNo('request', 1)
  }

  handleUpdate = () => {
    const { requestProductCount, page, activeSubCategory } = this.props
    if (requestProductCount > page * 10) {
      this.props.getRequestItems(activeSubCategory, page + 1)
      this.props.setPageNo('request', page + 1)
    }
  }

  render () {
    const { requestItems, breadcrumb, loading } = this.props
    return (
      <React.Fragment>
        <Grid.Column width={16} styleName='items-grid'>
          <Grid padded>
            <Grid.Row>
              <Grid.Column width={16} floated={'left'}>
                {breadcrumb()}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Table color={getTheme()} unstackable selectable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={6}>Item Name</Table.HeaderCell>
                      <Responsive
                        as={React.Fragment}
                        minWidth={Responsive.onlyTablet.maxWidth + 1}
                      >
                        <Table.HeaderCell width={6}>
                          Maximum price
                        </Table.HeaderCell>
                        <Table.HeaderCell width={2}>
                          Expiry date
                        </Table.HeaderCell>
                      </Responsive>
                      <Table.HeaderCell width={6} />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {requestItems.map((item, index) => {
                      return (
                        <CustomModal index={index} item={item} key={index} />
                      )
                    })}
                  </Table.Body>
                </Table>
                {requestItems.length === 0 && !loading ? (
                  <Grid.Column styleName='no-items' width={16}>
                    No items to show
                  </Grid.Column>
                ) : null}
              </Grid.Column>
              <Visibility
                once={false}
                onBottomVisible={() => this.handleUpdate()}
              />
            </Grid.Row>
            <Grid.Row styleName={'loader'}>
              <Grid.Column width={16} padded={'vertically'}>
                {loading ? <Loader active /> : null}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </React.Fragment>
    )
  }
}
