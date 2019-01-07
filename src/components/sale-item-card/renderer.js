import React from 'react'
import { render } from 'react-dom'
import {
    Image,
    Card,
    Icon,
    Visibility,
    Placeholder,
    Transition
} from 'semantic-ui-react'
import { formatDate, getExcerpt } from '../../constants/'
import CustomPopup from '../custom-popup'
import { getTheme } from 'formula_one'
import './index.css'

export default class SaleItemCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }
    isOwner = (itemUser) => {
        const { user } = this.props
        if (user.person) {
            return user.person.contactInformation.emailAddress == itemUser.person.contactInformation.emailAddress
        }
        return false
    }
    handleLoading = () => {
        this.setState({ loading: true })

        this.timerHandle = setTimeout(() => {
            this.setState({
                loading: false,
            });
        }, 1000);
    }
    componentWillUnmount() {
        if (this.timerHandle) {                  // ***
            clearTimeout(this.timerHandle);      // ***
            this.timerHandle = 0;                // ***
        }
    }

    render() {
        const { loading } = this.state
        const { item } = this.props
        return (
            <Card styleName='card-div' color={getTheme()} onClick={() => { }}>
                <Visibility fireOnMount onTopVisible={this.handleLoading}>
                </Visibility>
                {loading ? (
                    <Placeholder>
                        <Placeholder.Image rectangular />
                    </Placeholder>
                ) :
                    <Transition transitionOnMount visible={!loading} animation='fade' duration={500}>
                        <div
                            styleName='item-card-img'
                            style={{ background: `url(${item.pictures.length ? item.pictures[0] : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'})` }}
                        >
                        </div>
                    </Transition>
                }
                <Card.Content>
                    {loading ?
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line length='medium' />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line length='long' />
                                <Placeholder.Line length='very short' />
                            </Placeholder.Paragraph>
                        </Placeholder>
                        :
                        <>
                            <Card.Header styleName='title'>
                                <div styleName='card-header'>
                                    <div>
                                        {item.name}
                                    </div>
                                    {this.isOwner(item.person) ?
                                        <>
                                            <div>
                                                <CustomPopup type='sale' item={item} />
                                            </div>
                                        </>
                                        : null
                                    }
                                </div>
                            </Card.Header>
                            <Card.Meta>
                                <span styleName='date'><Icon name="rupee sign" size={'small'} />{item.cost}</span>
                            </Card.Meta>
                            <Card.Description>{getExcerpt(item.details, 45)}</Card.Description>
                        </>
                    }
                </Card.Content>
                <Card.Content extra>
                    {loading ?
                        <Placeholder>
                            <Placeholder.Paragraph>
                                <Placeholder.Line length='short' />
                            </Placeholder.Paragraph>
                        </Placeholder>
                        :
                        <span styleName='date'>
                            {formatDate(item.datetimeCreated)}
                        </span>
                    }
                </Card.Content>
            </Card >
        )
    }
}

