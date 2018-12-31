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
            formError: false,
        };
    }

    toggle = () => this.setState({ isPhoneVisible: !this.state.isPhoneVisible })

    handleChange = (event, { name, value }) => {
        console.log(this.state)
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
        let formData = new FormData()
        formData.append('end_date', this.state.endDate);
        formData.append('name', this.state.name);
        formData.append('category', this.state.category.slug);
        formData.append('cost', this.state.cost);
        formData.append('is_phone_visible', this.state.isPhoneVisible);
        this.props.addRequestItem(formData)
    }
    componentDidMount() {
    }
    handleCategoryChange = (e, { value, name, slug }) => {
        this.setState({
            category: {
                slug: slug,
                name: name
            },
        })
    }
    dropdown = () => {
        const { categories } = this.props
        const item = []
        categories.map((category, index) => {
            item.push(
                <React.Fragment key={index}>
                    <Dropdown.Item onClick={this.handleCategoryChange} value={category.name} slug={category.slug} name={category.name} key={index}>{category.name}</Dropdown.Item>
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
        const { formError, costError } = this.state
        return (
            <Grid.Column width={16}>
                <Grid padded stackable>
                    <Grid.Row centered>
                        <Grid.Column width={8}>
                            <Header as={'h3'}>Request an Item</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered >
                        <Grid.Column width={8}>
                            <Form error={formError} encType='multiple/form-data'>
                                <Form.Field required>
                                    <label>Item name</label>
                                    <Form.Input
                                        autoComplete='off'
                                        name='name'
                                        onChange={this.handleChange}
                                        value={this.state.name}
                                        required
                                        placeholder='item name'
                                    />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Category</label>
                                    <Dropdown
                                        scrolling
                                        fluid
                                        value={this.state.category.name}
                                        text={this.state.category.name}
                                        placeholder={'Select a category'}
                                    >
                                        <Dropdown.Menu>
                                            {this.dropdown()}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Field>
                                <Form.Field required>
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
                                <Form.Field error={costError} required>
                                    <label>Price</label>
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
                                <Form.Field>
                                    <label>Email-id</label>
                                    <Form.Input
                                        readOnly
                                        value={user.person ? user.person.contactInformation.emailAddress : ''}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='Add phone number'
                                        name='is_phone_visible'
                                        onChange={this.toggle} toggle />
                                </Form.Field>
                                <Form.Field>
                                    <Button
                                        type='submit'
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
