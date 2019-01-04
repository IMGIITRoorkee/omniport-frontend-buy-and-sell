import React from 'react'
import { render } from 'react-dom'
import {
    Icon,
    Popup,
    Header,
    Button,
    Dimmer,
    Form, 
} from 'semantic-ui-react'
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
    render() {
        const { item, type } = this.props
        const { active, popup, dimmerType } = this.state
        return (
            <>
                <Popup onClick={(e) => this.stopPropagation(e)} onOpen={(e) => this.handlePopup(e, true)} onClose={(e) => this.handlePopup(e, false)} open={popup} on={['hover', 'click']} position={'right center'} trigger={<Icon floated='right' styleName='edit-icon' name='ellipsis horizontal'></Icon>} hoverable>
                    <Icon styleName='card-icon' id={item.id} onClick={(e) => this.handleDimmer(e, true, 'edit')} name='edit'></Icon>
                    <Icon styleName='card-icon' onClick={(e) => this.handleDimmer(e, true, 'delete')} name='delete'></Icon>
                </Popup>
                <Dimmer page active={active} onClickOutside={(e) => this.handleDimmer(e, false, '')} onClick={(e) => this.stopPropagation(e)}>
                    {dimmerType == 'delete' ?
                        <>
                            <Header styleName='archive' icon='archive' content='Delete this item' />
                            <p>
                                Do you really want to delete {item.name} ?
                        </p>
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
                        </>
                        :
                        <>
                            <Form styleName='edit-grid'>
                                {type == 'sale' ?
                                    <SaleItemForm />
                                    : <RequestItemForm />
                                }
                            </Form>
                        </>

                    }
                </Dimmer>
            </>
        )
    }
}