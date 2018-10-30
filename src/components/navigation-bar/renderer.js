import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import { Search, Grid, Button, Icon, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { appUrl } from '../../constants/urls'
import './index.css'

class SearchBar extends React.Component {
    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()
            this.setState({
                isLoading: false,
            })
        }, 300)
    }

    render() {
        const { isLoading, value, results } = this.state

        return (
            <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                {...this.props}
            />
        )
    }
}

const trigger = (
    <Icon size={'big'} name={'user'} />
)

export default class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
    }
    render() {
        return (
            <Grid columns={3} stackable={true} padded={'vertically'}>
                <Grid.Row>
                    <Grid.Column width={3}>
                    </Grid.Column>
                    <Grid.Column computer={8} tablet={6}>
                        <SearchBar minCharacters={3} fluid={true} className={'bns-nav-search-bar'}>
                        </SearchBar>
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={7}>
                        <Grid columns={3}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Link to={appUrl + 'request_item/'}>
                                        <Button
                                            styleName={'nav-btn'}
                                            primary
                                            content='Request'
                                        />
                                    </Link>
                                </Grid.Column>
                                <Grid.Column>
                                    <Link to={appUrl + 'sell_item/'}>
                                        <Button
                                            styleName={'nav-btn'}
                                            primary
                                            content='Sell'
                                        />
                                    </Link>
                                </Grid.Column>
                                <Grid.Column>
                                    <Dropdown trigger={trigger} icon='' floating className={'bns-nav-usr-icon'} >
                                        <Dropdown.Menu>
                                            <Dropdown.Item>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
