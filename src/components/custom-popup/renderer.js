import React from 'react'
import { render } from 'react-dom'
import { Icon, Popup, Header, Button, Modal } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { getTheme } from 'formula_one'
import { appUrl } from '../../constants/urls'
import SaleItemForm from '../sale-item-form'
import RequestItemForm from '../request-item-form'
import './index.css'

export default class CustomPopup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false,
      popup: false,
      dimmerType: '',
      redirect: false,
      redirectUrl: ''
    }
  }
  edit = e => {
    e.stopPropagation()
  }
  delete = (e, id, type) => {
    const { detailView } = this.props
    e.stopPropagation()
    this.props.deleteItem(id, type)
    this.setState({
      active: false,
      dimmerType: '',
      redirect: detailView,
      redirectUrl: this.props.type
    })
  }
  handleDimmer = (e, value, type) => {
    this.setState({
      active: value,
      popup: false,
      dimmerType: type
    })
    e.stopPropagation()
  }
  handlePopup = (e, value) => {
    this.setState({
      popup: value
    })
    if (e.type === 'click') e.stopPropagation()
  }
  stopPropagation = e => {
    e.stopPropagation()
  }
  acceptSubmit = (childSubmit, childFormError) => {
    this.childSubmit = childSubmit
    this.childFormError = childFormError
  }
  renderRedirect = () => {
    const { redirectUrl } = this.state
    if (this.state.redirect) {
      return <Redirect to={`${appUrl}${redirectUrl}`} />
    }
  }
  render () {
    const { item, type, detailView } = this.props
    const { active, popup, dimmerType } = this.state
    return (
      <>
        {detailView ? (
          <>
            <div styleName='options-icon'>
              <Icon
                styleName='card-icon'
                id={item.id}
                onClick={e => this.handleDimmer(e, true, 'edit')}
                name='edit'
              />
              <Icon
                styleName='card-icon'
                onClick={e => this.handleDimmer(e, true, 'delete')}
                name='trash'
              />
            </div>
          </>
        ) : (
          <Popup
            onClick={e => this.stopPropagation(e)}
            onOpen={e => this.handlePopup(e, true)}
            onClose={e => this.handlePopup(e, false)}
            open={popup}
            on={['click']}
            position={'right center'}
            trigger={
              <Icon
                floated='right'
                styleName='edit-icon'
                name='ellipsis horizontal'
              />
            }
            hoverable
          >
            <Popup
              trigger={
                <Icon
                  styleName='card-icon'
                  id={item.id}
                  onClick={e => this.handleDimmer(e, true, 'edit')}
                  name='edit'
                />
              }
              inverted
              position='top center'
              content='Edit'
            />
            <Popup
              trigger={
                <Icon
                  styleName='card-icon'
                  onClick={e => this.handleDimmer(e, true, 'delete')}
                  name='trash'
                />
              }
              inverted
              position='top center'
              content='Delete'
            />
          </Popup>
        )}
        <Modal
          size='small'
          open={active}
          onClose={e => this.handleDimmer(e, false, '')}
          onClick={e => this.stopPropagation(e)}
          closeIcon
        >
          {dimmerType === 'delete' ? (
            <>
              <Header icon='archive' content='Delete this item' />
              <Modal.Content>
                <p>Do you really want to delete {item.name} ?</p>
              </Modal.Content>
              <Modal.Actions>
                <div styleName='yesNo'>
                  <Button
                    onClick={e => this.handleDimmer(e, false, '')}
                    color={getTheme()}
                    inverted
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={e => this.delete(e, item.id, type)}
                    color={getTheme()}
                  >
                    <Icon name='trash' />
                    Delete
                  </Button>
                </div>
              </Modal.Actions>
            </>
          ) : (
            <>
              <Modal.Header>{`Update`}</Modal.Header>
              <Modal.Content scrolling styleName='modal-cont'>
                {type === 'buy' ? (
                  <SaleItemForm
                    item={item}
                    shareSubmit={this.acceptSubmit.bind(this)}
                    handleDimmer={e => this.handleDimmer(e, false, '')}
                  />
                ) : (
                  <RequestItemForm
                    item={item}
                    shareSubmit={this.acceptSubmit.bind(this)}
                    handleDimmer={e => this.handleDimmer(e, false, '')}
                  />
                )}
              </Modal.Content>
              <Modal.Actions>
                <Button
                  icon='send'
                  color={getTheme()}
                  content='Update'
                  onClick={e => this.childSubmit(e)}
                />
              </Modal.Actions>
            </>
          )}
        </Modal>
        {this.renderRedirect()}
      </>
    )
  }
}
