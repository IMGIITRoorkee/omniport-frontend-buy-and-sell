import React from 'react'
import { render } from 'react-dom'
import {
    Icon,
    Popup,
    Header,
    Button,
    Modal
} from 'semantic-ui-react'
import { getTheme } from 'formula_one'
import SaleItemForm from '../sale-item-form'
import RequestItemForm from '../request-item-form'
import './index.css'

export default class CustomPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
            popup: false,
            dimmerType: ''
        }
    }
    edit = (e, ) => {
        e.stopPropagation();
    }
    delete = (e, id, type) => {
        e.stopPropagation();
        this.props.deleteItem(id, type)
        this.setState({
            active: false,
            dimmerType: ''
        })
        e.stopPropagation();
    }
    handleDimmer = (e, value, type) => {
        this.setState({
            active: value,
            popup: false,
            dimmerType: type
        })
        e.stopPropagation();
    }
    handlePopup = (e, value) => {
        this.setState({
            popup: value,
        })
        if (e.type == 'click')
            e.stopPropagation()
    }
    stopPropagation = (e) => {
        e.stopPropagation()
    }
    acceptSubmit = (childSubmit, childFormError) => {
        this.childSubmit = childSubmit
        this.childFormError = childFormError
    }
    render() {
        const { item, type } = this.props
        const { active, popup, dimmerType } = this.state
        return (
            <>
                <Popup onClick={(e) => this.stopPropagation(e)} onOpen={(e) => this.handlePopup(e, true)} onClose={(e) => this.handlePopup(e, false)} open={popup} on={['hover', 'click']} position={'right center'} trigger={<Icon floated='right' styleName='edit-icon' name='ellipsis horizontal'></Icon>} hoverable>
                    <Icon styleName='card-icon' id={item.id} onClick={(e) => this.handleDimmer(e, true, 'edit')} name='edit'></Icon>
                    <Icon styleName='card-icon' onClick={(e) => this.handleDimmer(e, true, 'delete')} name='delete'></Icon>
                </Popup>
                <Modal size='tiny' basic={dimmerType == 'delete'} open={active} onClose={(e) => this.handleDimmer(e, false, '')} onClick={(e) => this.stopPropagation(e)}>
                    {dimmerType == 'delete' ?
                        <>
                            <Header styleName='archive' icon='archive' content='Delete this item' />
                            <Modal.Content>
                                <p>
                                    Do you really want to delete {item.name} ?
                        </p>
                            </Modal.Content>
                            <Modal.Actions>
                                <div styleName='yesNo'>
                                    <Button onClick={(e) => this.handleDimmer(e, false, '')} basic color='red' inverted>
                                        <Icon name='remove' />
                                        No
                            </Button>
                                    <Button onClick={(e) => this.delete(e, item.id, type)} color='green' inverted>
                                        <Icon name='checkmark' />
                                        Yes
                            </Button>
                                </div>
                            </Modal.Actions>
                        </>
                        :
                        <>
                            <Modal.Header>
                                {`Update ${item.name}`}
                            </Modal.Header>
                            <Modal.Content scrolling styleName='modal-cont' >
                                {type == 'sale' ?
                                    <SaleItemForm item={item} shareSubmit={this.acceptSubmit.bind(this)} handleDimmer={(e) => this.handleDimmer(e, false, '')} />
                                    : <RequestItemForm item={item} shareSubmit={this.acceptSubmit.bind(this)} handleDimmer={(e) => this.handleDimmer(e, false, '')} />

                                }
                            </Modal.Content>
                            <Modal.Actions>
                                <Button icon='send' color={getTheme()} content='Update' onClick={(e) => this.childSubmit(e)} />
                            </Modal.Actions>
                        </>
                    }
                </Modal>
            </>
        )
    }
}