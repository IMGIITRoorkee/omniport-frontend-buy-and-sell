import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import { Search, Grid, Button, Icon, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getTheme } from 'formula_one'
import { appUrl } from '../../constants/urls'
import './index.css'

export default class SearchBar extends React.Component {
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
            <Grid container>
                <Grid.Row centered>
                    <Grid.Column computer={7} tablet={8} mobile={16}>
                        <Search
                            loading={isLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                            results={results}
                            value={value}
                            {...this.props}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export class NavBarButtons extends React.Component {
    componentWillMount() {
    }
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Link to={appUrl + 'request_item/'}>
                            <Button fluid
                                content='Request'
                                color={getTheme()}
                            />
                        </Link>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Link to={appUrl + 'sell_item/'}>
                            <Button fluid
                                color={getTheme()}
                                content='Sell'
                            />
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )

    }
}