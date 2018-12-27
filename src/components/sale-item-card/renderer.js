import React from 'react'
import { render } from 'react-dom'
import {
    Image,
    Card, Icon,
} from 'semantic-ui-react'
import { formatDate, getExcerpt } from '../../constants/'
import './index.css'

export default class SaleItemCard extends React.Component {

    render() {
        return (
            <Card onClick={() => this.props.onlick(this.props.item)}>
                <Image
                    as={() => {
                        return (
                            <div
                                styleName='item-card-img'
                                style={{ background: `url(${this.props.item.pictures.length ? this.props.item.pictures[0] : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'})` }}
                            >
                            </div>
                        )
                    }
                    }
                    fluid />
                <Card.Content>
                    <Card.Header styleName='title'>{this.props.item.name}</Card.Header>
                    <Card.Meta>
                        <span className='date'><Icon name="rupee sign" size={'small'} />{this.props.item.cost}</span>
                    </Card.Meta>
                    <Card.Description>{getExcerpt(this.props.item.details, 10)}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <span>
                        {formatDate(this.props.item.datetimeCreated)}
                    </span>
                </Card.Content>
            </Card>
        )
    }
}