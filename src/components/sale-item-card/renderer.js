import React from 'react'
import { render } from 'react-dom'
import {
    Image,
    Card,
    Icon,
    Popup,
    Segment,
    Divider,
    Modal,
    Header,
    Button,
    Dimmer
} from 'semantic-ui-react'
import { formatDate, getExcerpt } from '../../constants/'
import { getTheme } from 'formula_one'
import './index.css'

export class CustomPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
            popup: false
        }
    }
    edit = (e, ) => {
        e.stopPropagation();
    }
    delete = (e, id) => {
        e.stopPropagation();
        this.props.deleteItem(id, 'sale')
        this.setState({
            active: false,
        })
    }
    handleDimmer = (value) => {
        this.setState({
            active: value,
            popup: false
        })
    }
    handlePopup = (value) => {
        this.setState({
            popup: value
        })
    }
    preventPropogation = (e, ) => {
        e.stopPropagation();
    }

    render() {
        const { item } = this.props
        const { active, popup } = this.state
        return (
            <>
                <Popup onOpen={() => this.handlePopup(true)} onClose={() => this.handlePopup(false)} open={popup} on='hover' onClick={this.preventPropogation} position={'right center'} trigger={<Icon floated='right' styleName='edit-icon' name='ellipsis vertical'></Icon>} hoverable>
                    <Icon styleName='card-icon' id={item.id} onClick={this.edit} name='edit'></Icon>
                    <Icon styleName='card-icon' onClick={() => this.handleDimmer(true)} name='delete'></Icon>
                </Popup>
                <Dimmer page active={active} onClickOutside={() => this.handleDimmer(false)}>
                    <Header styleName='archive' icon='archive' content='Archive this item' />
                    <p>
                        Do you really want to archive {item.name} ?
            </p>
                    <div styleName='yesNo'>
                        <Button onClick={() => this.handleDimmer(false)} basic color='red' inverted>
                            <Icon name='remove' />
                            No
                </Button>
                        <Button onClick={(e) => this.delete(e, item.id)} color='green' inverted>
                            <Icon name='checkmark' />
                            Yes
                </Button>
                    </div>
                </Dimmer>
            </>
        )
    }
}
export default class SaleItemCard extends React.Component {
    isOwner = (itemUser) => {
        const { user } = this.props
        if (user.person) {
            return user.person.contactInformation.emailAddress == itemUser.person.contactInformation.emailAddress
        }
        return false
    }

    render() {
        const { item } = this.props
        return (
            <Card color={getTheme()} onClick={() => this.props.onlick(item)}>
                <Image
                    as={() => {
                        return (
                            <div
                                styleName='item-card-img'
                                style={{ background: `url(${item.pictures.length ? item.pictures[0] : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'})` }}
                            >
                            </div>
                        )
                    }
                    }
                    fluid />
                <Card.Content>
                    <Card.Header styleName='title'>
                        <div styleName='card-header'>
                            <div>
                                {item.name}
                            </div>
                            {this.isOwner(item.person) ?
                                <>
                                    <div>
                                        <CustomPopup deleteItem={this.props.deleteItem} item={item} />
                                    </div>
                                </>
                                : null
                            }
                        </div>
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'><Icon name="rupee sign" size={'small'} />{item.cost}</span>
                    </Card.Meta>
                    <Card.Description>{getExcerpt(item.details, 47)}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <span>
                        {formatDate(item.datetimeCreated)}
                    </span>
                </Card.Content>
            </Card>
        )
    }
}

