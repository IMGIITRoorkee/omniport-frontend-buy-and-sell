import axios from 'axios'
import { getCookie } from 'formula_one/src/utils'
import React from 'react'
import { render } from 'react-dom'
import { Grid, Icon, Radio, Button, Dropdown, Form, Header, Image } from 'semantic-ui-react'
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
            <label styleName={this.props.styles.label} htmlFor={`uploadPhoto${this.props.count}`}><Icon styleName={this.props.styles.icon} name='add'></Icon></label>
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
            endDate: '',
            name: '',
            category: {
                name: '',
                slug: ''
            },
            details: '',
            cost: '',
            warrantyDetail: '',
            isPhoneVisible: false,
            paymentModes: [],
            pictures: ['', '', ''],
            categoryError: false,
        };
    }
    toggle = () => this.setState({ isPhoneVisible: !this.state.isPhoneVisible })

    handleChangePhone = (event, { name }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: !this.state[name] });
        }
    }
    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }
    handleSelectPicture = (e) => {

        if (e.target.files && e.target.files.length > 0) {
            const newPictures = this.state.pictures.slice()
            let count = e.target.getAttribute('count')
            newPictures[count] = URL.createObjectURL(e.target.files[0])
            this.setState({ pictures: newPictures })
        }
    };
    handlePaymentChange = (event, { value }) => {
        this.setState({ paymentModes: value });
    }
    handleSubmit = () => {
        const { name, pictures, category, paymentModes, endDate, details, cost, warrantyDetail, isPhoneVisible } = this.state
        let formData = new FormData()
        formData.append('end_date', endDate);
        formData.append('name', name);
        formData.append('category', category.slug);
        formData.append('details', details);
        formData.append('cost', cost);
        formData.append('warranty_detail', warrantyDetail);
        formData.append('is_phone_visible', isPhoneVisible);
        paymentModes.map((mode) => {
            formData.append('payment_modes[]', mode)
        })
        this.props.addSaleItem(formData, pictures)
        // this.state.picture ? formData.append('picture', this.state.picture) : void 0
        // console.log(this.state.picture)
        let headers = {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': getCookie('csrftoken')
        }


    }
    handleCategoryChange = (e, { value, name, slug }) => {
        let result = false;
        const { costError, nameError } = this.state
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
    componentDidMount() {
        this.props.getPayment()
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
    hadleImgClose = (e, key) => {
        let newPictures = this.state.pictures;
        newPictures[key] = ''
        this.setState({
            pictures: newPictures
        })
    }
    render() {
        const { categoryError, pictures, cost, endDate, category, warrantyDetail, details, name } = this.state
        const paymentModes = this.props.paymentModes.map((mode, index) => {
            return {
                key: mode.name,
                value: mode.name,
                text: mode.name
            }
        })
        return (
            <Grid.Column width={16}>
                <Grid padded stackable>
                    <Grid.Row centered>
                        <Grid.Column width={8}>
                            <Header as={'h3'}>Sell an Item</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column width={8}>
                            <Form encType='multiple/form-data'>
                                <Form.Field>
                                    <label>Item name</label>
                                    <Form.Input
                                        autoComplete='off'
                                        name='name'
                                        onChange={this.handleChange}
                                        value={name}
                                        required
                                        placeholder='item name'
                                    />
                                </Form.Field>
                                <Form.Field styleName='field-form' required>
                                    <label>Category</label>
                                    <Dropdown
                                        scrolling
                                        fluid
                                        value={category.name}
                                        text={category.name}
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
                                <Form.Field>
                                    <label>Accepted modes of payment</label>
                                    <Dropdown
                                        placeholder='Payment modes'
                                        fluid
                                        multiple
                                        selection
                                        onChange={this.handlePaymentChange}
                                        options={paymentModes} />
                                </Form.Field>
                                <Form.Field styleName='field-form' required>
                                    <label>Expires On</label>
                                    <DateInput
                                        closable
                                        popupPosition="right center"
                                        name="endDate"
                                        minDate={new Date()}
                                        placeholder="expires on"
                                        value={endDate}
                                        iconPosition="left"
                                        required
                                        dateFormat="YYYY-MM-DD"
                                        onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Description</label>
                                    <Form.Input
                                        autoComplete='off'
                                        name='details'
                                        onChange={this.handleChange}
                                        value={details}
                                        required
                                        placeholder='Description of the product'
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Price</label>
                                    <Form.Input
                                        autoComplete='off'
                                        name='cost'
                                        onChange={this.handleChange}
                                        value={cost}
                                        required
                                        placeholder='Price'
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>State of warranty</label>
                                    <Form.Input
                                        autoComplete='off'
                                        name='warrantyDetail'
                                        value={warrantyDetail}
                                        onChange={this.handleChange}
                                        placeholder='for eg. 3 months left'
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio toggle
                                        label='Add phone number'
                                        name='isPhoneVisible'
                                        onChange={this.toggle} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Upload Images</label>
                                    <div styleName='img-add-div'>
                                        {!pictures[0] ?
                                            <UploadButton onChange={this.handleSelectPicture} count={'0'} styles={style} />
                                            :
                                            <div styleName='img-div'>
                                                <Image styleName='upload-img' src={pictures[0]} rounded />
                                                <Icon onClick={(e) => this.hadleImgClose(e, 0)} key={0} circular inverted link name='close' styleName='close-btn' />
                                            </div>
                                        }
                                        {pictures[0] && !pictures[1] ?
                                            <UploadButton onChange={this.handleSelectPicture} count={'1'} styles={style} />
                                            : <>
                                                {pictures[1] ?
                                                    <div styleName='img-div'>
                                                        <Image styleName='upload-img' src={pictures[1]} rounded />
                                                        <Icon onClick={(e) => this.hadleImgClose(e, 1)} key={1} circular inverted link name='close' styleName='close-btn' />
                                                    </div>
                                                    : null
                                                }
                                            </>
                                        }
                                        {pictures[0] && pictures[1] && !pictures[2] ?
                                            <UploadButton onChange={this.handleSelectPicture} count={'2'} styles={style} />
                                            : <>
                                                {pictures[2] ?
                                                    <div styleName='img-div'>
                                                        <Image styleName='upload-img' src={pictures[2]} rounded />
                                                        <Icon onClick={(e) => this.hadleImgClose(e, 2)} key={2} circular inverted link name='close' styleName='close-btn' />
                                                    </div>
                                                    : null
                                                }
                                            </>
                                        }
                                    </div>
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
            </Grid.Column>
        )
    }
}
