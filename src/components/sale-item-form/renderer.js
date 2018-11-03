import axios from 'axios'
import { getCookie } from 'formula_one/src/utils'
import React from 'react'
import { render } from 'react-dom'
import { Grid, Icon, Radio, Button, Dropdown, Form, Header } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react';
import './index.css'

class UploadButton extends React.Component {

    render() {
        return (<>
            <input
                styleName={this.props.styles.image}
                type='file'
                onChange={this.props.onChange}
                count={this.props.count}
                name={`picture${this.props.count}`}
                id={`uploadPhoto${this.props.count}`}
            />
            <label styleName={this.props.styles.label} for={`uploadPhoto${this.props.count}`}><Icon styleName={this.props.styles.icon} name='add'></Icon></label>
        </>
        )
    }
}
let style = {
    image: 'image-upload-input',
    label: 'image-upload-label',
    icon: 'image-upload-label'
}

export default class SaleItemForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            end_date: '',
            name: '',
            category: '',
            details: '',
            cost: '',
            warranty_detail: '',
            is_phone_visible: false,
            payment_modes: [],
            pictures:['','','']
        };
    }
    handleChangePhone = (event, { name }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: !this.state[name] });
        }
    }
    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
        console.log(this.state)
    }
    handleSelectPicture = (e) => {
        
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            const newPictures = this.state.pictures.slice()
            let count = e.target.getAttribute('count')
            reader.addEventListener("load", () =>{
                newPictures[count] = reader.result
                this.setState({ pictures: newPictures })
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    handlePaymentChange = (event, { value }) => {
        this.setState({ payment_modes: value });
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
        this.state.payment_modes.map((mode) => {
            formData.append('payment_modes[]', mode)
        })

        // this.state.picture ? formData.append('picture', this.state.picture) : void 0
        // console.log(this.state.picture)
        let headers = {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': getCookie('csrftoken')
        }
        axios({
            method: 'post',
            url: '/api/buyandsell/sale_product/',
            headers: headers,
            data: formData
        }).then((response) => {
            console.log(response)

        }).catch((error) => {
            console.log(error.response.data);
        });

    }
    handleCategoryChange = (e, { value }) => {
        this.setState({
            category: value
        })
    }
    componentDidMount() {
        this.props.getPayment()
    }
    render() {
        const { categories } = this.props;
        const payment_modes = this.props.paymentModes.map((mode, index) => {
            return {
                key: mode.name,
                value: mode.name,
                text: mode.name
            }
        })
        let dropdown = categories ? categories.map((category, index) => {
            return (
                <React.Fragment key={index}>
                    <Dropdown.Item onClick={this.handleCategoryChange} value={category.name} key={index}>{category.name}</Dropdown.Item>
                    {category.subCategories.map((subCategory, i) => {
                        return (
                            <Dropdown.Item styleName='sub-cat' value={subCategory.name} onClick={this.handleCategoryChange} key={i}>{subCategory.name}</Dropdown.Item>
                        )
                    })}
                </React.Fragment>
            )
        }) : null
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
                                    scrolling
                                    fluid
                                    text={this.state.category}
                                    placeholder={this.state.category ? null : 'Select a category'}
                                >
                                    <Dropdown.Menu>
                                        {dropdown}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Field>
                            <Form.Field>
                                <label>Accepted modes of payment</label>
                                <Dropdown
                                    placeholder='Payment modes'
                                    fluid
                                    multiple
                                    selection
                                    onChange={this.handlePaymentChange}
                                    options={payment_modes} />
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
                                <Radio toggle
                                    label='Add phone number'
                                    name='is_phone_visible'
                                    onChange={this.handleChangePhone} />
                            </Form.Field>
                            <Form.Field>
                                <label>Upload Images</label>
                                <UploadButton onChange={this.handleSelectPicture} count={'0'} styles={style} />
                                <UploadButton onChange={this.handleSelectPicture} count={'1'} styles={style} />
                                <UploadButton onChange={this.handleSelectPicture}count={'2'} styles={style} />
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
