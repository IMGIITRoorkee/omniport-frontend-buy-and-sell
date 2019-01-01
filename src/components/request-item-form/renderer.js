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
        };
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
        }
    }
    handleSubmit = () => {
        const { endDate, name, category, cost, isPhoneVisible } = this.state
        if (category.slug === '') {
            this.setState({
                categoryError: true,
                formError: true
            })
            return
        }
        // if (name === '') {
        //     this.setState({
        //         nameError: true,
        //         formError: true
        //     })
        //     return
        // }
        let formData = new FormData()
        formData.append('end_date', endDate);
        formData.append('name', name);
        formData.append('category', category.slug);
        formData.append('cost', cost);
        formData.append('is_phone_visible', isPhoneVisible);
        this.props.addRequestItem(formData)
        setTimeout(() => {
            this.props.history.replace('/buy_and_sell/request/')
        }, 500);
    }
    componentDidMount() {
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
        const { user } = this.props
        const { formError, costError, nameError, categoryError } = this.state
        return (
            <Grid.Column width={16}>
                <Grid padded stackable styleName='grid-cont'>
                    <Grid.Row styleName='heading-row' centered>
                        <Grid.Column width={8}>
                            <Header as={'h3'}>Request an item</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered >
                        <Grid.Column width={8}>
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
                                            content={`This is not a valid name.`}
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
                                        name='is_phone_visible'
                                        onChange={this.toggle} toggle />
                                </Form.Field>

                                <Form.Field styleName='field-form'>
                                    <Button
                                        type='submit'
                                        disabled={formError}
                                        onClick={this.handleSubmit}
                                        position='right'
                                        color={getTheme()}
                                        icon
                                        labelPosition='left'
                                    >
                                        <Icon name='send' />
                                        Submit
                            </Button>
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
        )
    }
}
