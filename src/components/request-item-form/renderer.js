import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'
import { Grid, Icon, Radio, Button, Dropdown, Form, Header, Message } from 'semantic-ui-react'
import { getTheme } from 'formula_one'
import { DateInput } from 'semantic-ui-calendar-react';
import './index.css'


export default class RequestItemForm extends React.Component {
    constructor(props) {
        super(props)
        const { item } = this.props
        if (!item) {
            this.state = {
                endDate: '',
                name: '',
                category: {
                    name: '',
                    slug: ''
                },
                cost: '',
                isPhoneVisible: false,
                nameError: false,
                costError: false,
                categoryError: false,
                formError: false,
            }
        }
        else {
            let categoryName = ''
            this.props.categories.map((category) => {
                if (item.category == category.slug) {
                    categoryName = category.name
                    return
                }
                category.subCategories.map((subCategory) => {
                    if (item.category == subCategory.slug) {
                        categoryName = subCategory.name
                        return
                    }
                })
            })
            this.state = {
                endDate: item.endDate,
                name: item.name,
                category: {
                    name: categoryName,
                    slug: item.category
                },
                cost: item.cost,
                isPhoneVisible: item.isPhoneVisible,
                nameError: false,
                costError: false,
                categoryError: false,
                formError: false,
                id: item.id
            }
        }
    }

    toggle = () => this.setState({ isPhoneVisible: !this.state.isPhoneVisible })

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
            if (name == 'cost') {
                this.setState({
                    costError: isNaN(value),
                    formError: isNaN(value)
                })
            }
            else if (name == 'name') {
                if (!isNaN(value) && value.length > 0) {
                    this.setState({
                        nameError: true,
                        formError: true
                    })
                }
                else {
                    this.setState({
                        nameError: false,
                        formError: false
                    })
                }
            }
        }
    }
    handleSubmit = (e) => {
        const { endDate, name, category, cost, isPhoneVisible } = this.state
        const { item } = this.props
        if (category.slug === '') {
            this.setState({
                categoryError: true,
                formError: true
            })
            return
        }
        if (isNaN(cost) || cost.length < 1) {
            this.setState({
                costError: true,
                formError: true
            })
            return
        }
        if (name.length < 3 || !isNaN(name)) {
            this.setState({
                nameError: true,
                formError: true
            })
            return
        }
        let formData = new FormData()
        formData.append('end_date', endDate);
        formData.append('name', name);
        formData.append('category', category.slug);
        formData.append('cost', cost);
        formData.append('is_phone_visible', isPhoneVisible);
        if (item) {
            this.props.updateRequestItem(formData, item.id)
            this.props.handleDimmer(e)
        }
        else {
            this.props.addRequestItem(formData)
            setTimeout(() => {
                this.props.history.replace('/buy_and_sell/request/')
            }, 500);
        }

    }
    componentDidMount() {
        const { item, shareSubmit } = this.props
        if (item) {
            shareSubmit(this.handleSubmit.bind(this))
        }
    }
    handleCategoryChange = (e, { value, name, slug }) => {
        let result = false;
        const { costError, nameError, categoryError } = this.state
        if (costError || nameError) {
            result = true
        }
        this.setState({
            category: {
                slug: slug,
                name: name
            },
            categoryError: false,
            formError: result
        })
    }
    dropdown = () => {
        const { categories } = this.props
        const item = []
        categories.map((category, index) => {
            item.push(
                <React.Fragment key={index}>
                    <Dropdown.Item styleName='category-item' onClick={this.handleCategoryChange} value={category.name} slug={category.slug} name={category.name} key={index}>{category.name}</Dropdown.Item>
                    {category.subCategories.map((subCategory, i) => {
                        return (
                            <Dropdown.Item styleName='sub-cat' value={subCategory.name} name={subCategory.name} slug={subCategory.slug} onClick={this.handleCategoryChange} key={i}>{subCategory.name}</Dropdown.Item>
                        )
                    })}
                </React.Fragment>
            )
        })
        return (item)
    }
    render() {
        const { user, item } = this.props
        const { formError, costError, nameError, categoryError } = this.state
        return (
            <Grid.Column width={16}>
                <Grid padded stackable styleName={!item ? 'grid-cont' : ''}>
                    {!item ?
                        <Grid.Row styleName='heading-row' centered>
                            <Grid.Column width={8}>
                                <Header as={'h3'} dividing>Request an item</Header>
                            </Grid.Column>
                        </Grid.Row>
                        : null}
                    <Grid.Row centered >
                        <Grid.Column width={`${!item ? 8 : 14}`}>
                            <Form error={formError} encType='multiple/form-data'>
                                <Form.Field styleName='field-form' required>
                                    <label>Item name</label>
                                    <Form.Input
                                        autoComplete='off'
                                        name='name'
                                        onChange={this.handleChange}
                                        value={this.state.name}
                                        required
                                        placeholder='item name'
                                    />
                                    {nameError ?
                                        <Message
                                            error
                                            content={`Field is empty or invalid name`}
                                        />
                                        : null
                                    }
                                </Form.Field>
                                <Form.Field styleName='field-form' required>
                                    <label>Category</label>
                                    <Dropdown
                                        scrolling
                                        fluid
                                        value={this.state.category.name}
                                        text={this.state.category.name}
                                        placeholder={'Select a category'}
                                        styleName='category-field'
                                    >
                                        <Dropdown.Menu>
                                            {this.dropdown()}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {categoryError ?
                                        <Message
                                            error
                                            content={`Category field can't be empty.`}
                                        />
                                        : null
                                    }
                                </Form.Field>
                                <Form.Field styleName='field-form' required>
                                    <label>Expires On</label>
                                    <DateInput
                                        closable
                                        popupPosition="right center"
                                        name="endDate"
                                        minDate={new Date()}
                                        placeholder="expires on"
                                        value={this.state.endDate}
                                        iconPosition="left"
                                        required
                                        dateFormat="YYYY-MM-DD"
                                        onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Field styleName='field-form' error={costError} required>
                                    <label>Maximum Price</label>
                                    <Form.Input
                                        error={costError}
                                        autoComplete='off'
                                        name='cost'
                                        onChange={this.handleChange}
                                        value={this.state.cost}
                                        required
                                        placeholder='price'
                                    />
                                </Form.Field>
                                {costError ?
                                    <Message
                                        error
                                        content='Maxium price can only be numeric value.'
                                    />
                                    : null
                                }
                                <Form.Field styleName='field-form'>
                                    <label>Email-id</label>
                                    <Form.Input
                                        readOnly
                                        value={user.person ? user.person.contactInformation.emailAddress : ''}
                                    />
                                </Form.Field>
                                <Form.Field styleName='field-form'>
                                    <Radio
                                        label='Add phone number'
                                        name='isPhoneVisible'
                                        onChange={this.toggle} toggle />
                                </Form.Field>
                                {!item ?
                                    <Form.Field styleName='field-form'>
                                        <Button
                                            type='submit'
                                            disabled={formError}
                                            onClick={(e) => this.handleSubmit(e)}
                                            color={getTheme()}
                                            floated='right'
                                            icon
                                            labelPosition='left'
                                        >
                                            <Icon name='send' />
                                            {!item ? 'Submit' : 'Update'}
                                        </Button>
                                    </Form.Field>
                                    : null}
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
        )
    }
}
