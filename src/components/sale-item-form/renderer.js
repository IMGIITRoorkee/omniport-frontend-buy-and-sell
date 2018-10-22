import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'
import { Grid, Icon, Radio, Button, Dropdown, Form, Header } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react';
import './index.css'


export default class SaleItemForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            end_date: '',
            name: '',
            category: '5',
            details: '',
            cost: '',
            warranty_detail: '',
            is_phone_visible: false,
            payment_modes: [3],
        };
    }
    handleChangePhone = (event, {name}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: true });
        } 
    }
    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }
    handleSubmit = () => {
        let formData = new FormData()
        formData.append('end_date', this.state.end_date);
        formData.append('name', this.state.name);
        formData.append('category', this.state.category);
        formData.append('details', this.state.details);
        formData.append('cost', this.state.cost);
        formData.append('warranty_detail', this.state.warranty_detail);
        formData.append('is_phone_visible', this.state.is_phone_visible);
        formData.append('payment_modes', this.state.payment_modes)
    }
    componentDidMount() {
    }
    render() {
        return (
            <Grid padded stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Header as={'h3'}>Sell an Item</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column width={8}>
                        <Form encType='multiple/form-data'>
                            <Form.Field>
                                <label>Item name</label>
                                <Form.Input
                                    autoComplete='off'
                                    type='input'
                                    name='name'
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                    required
                                    placeholder='item name'
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Category</label>
                                <Dropdown
                                    selection
                                    name='categorys'
                                    placeholder='Select a category'
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Expires On</label>
                                <DateInput
                                    closable
                                    popupPosition="right center"
                                    name="end_date"
                                    minDate={new Date()}
                                    placeholder="expires on"
                                    value={this.state.end_date}
                                    iconPosition="left"
                                    required
                                    dateFormat="YYYY-MM-DD"
                                    onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Description</label>
                                <Form.Input
                                    autoComplete='off'
                                    type='input'
                                    name='details'
                                    onChange={this.handleChange}
                                    value={this.state.details}
                                    required
                                    placeholder='description of the product'
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <Form.Input
                                    autoComplete='off'
                                    type='input'
                                    name='cost'
                                    onChange={this.handleChange}
                                    value={this.state.cost}
                                    required
                                    placeholder='price'
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>State of warranty</label>
                                <Form.Input
                                    autoComplete='off'
                                    type='input'
                                    name='warranty_detail'
                                    value={this.state.warranty_detail}
                                    onChange={this.handleChange}
                                    placeholder='State of warranty'
                                />
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    label='Add phone number'
                                    name='is_phone_visible'
                                    onChange={this.handleChangePhone} />
                            </Form.Field>
                            <Form.Field>
                                <Button
                                    type='submit'
                                    onClick={this.handleSubmit}
                                    position='right'
                                    color={"blue"}
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
        )
    }
}
