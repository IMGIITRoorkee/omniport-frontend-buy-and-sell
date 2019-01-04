import React from 'react'
import { render } from 'react-dom'
import {
    Image,
    Card,
    Icon,
} from 'semantic-ui-react'
import { formatDate, getExcerpt } from '../../constants/'
import CustomPopup from '../custom-popup'
import { getTheme } from 'formula_one'
import './index.css'

export default class SaleItemCard extends React.Component {
    isOwner = (itemUser) => {
        const { user } = this.props
        if (user.person) {
            return user.person.contactInformation.emailAddress == itemUser.person.contactInformation.emailAddress
        }
        return false
    }

    render() {
        const { item, deleteItem } = this.props
        return (
            <Card styleName='card-div' color={getTheme()} onClick={()=>{}}>
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
                                        <CustomPopup type='sale' deleteItem={deleteItem} item={item} />
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

