import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'
import {
  Grid,
  Icon,
  Radio,
  Button,
  Dropdown,
  Responsive,
  Form,
  Header,
  Message
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getTheme } from 'formula_one'
import { DateInput } from 'semantic-ui-calendar-react'
import { toast } from 'react-semantic-toasts'
import './index.css'

export default class RequestItemForm extends React.Component {
  constructor (props) {
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
        formError: true
      }
    } else {
      let categoryName = ''
      this.props.categories.map(category => {
        if (item.category === category.slug) {
          categoryName = category.name
          return
        }
        category.subCategories.map(subCategory => {
          if (item.category === subCategory.slug) {
            categoryName = subCategory.name
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

  componentDidMount () {
    const { item, shareSubmit } = this.props
    if (item) {
      shareSubmit(this.handleSubmit.bind(this))
    }
    if (this.props.scrollDiv) {
      this.props.scrollDiv()
    }
  }

  componentDidUpdate (prevProps) {
    if (
      this.props.appMessages.requestItemMessage !==
      prevProps.appMessages.requestItemMessage
    ) {
      const { appMessages } = this.props
      if (appMessages.requestItemMessage.status) {
        this.setState({
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
          formError: true
        })
      }
    }
  }

  componentWillUnmount () {
    this.props.updateMessage()
  }

  toggle = () => this.setState({ isPhoneVisible: !this.state.isPhoneVisible })

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value })
      if (name === 'cost') {
        if (
          isNaN(value) ||
          parseFloat(value) < 0 ||
          parseFloat(value) > 1000000
        ) {
          this.setState({
            costError: true,
            formError: true
          })
        } else {
          let err = this.state.nameError || this.state.categoryError
          this.setState({
            costError: false,
            formError: err
          })
        }
      } else if (name === 'name') {
        if (!isNaN(value) && value.length > 0) {
          this.setState({
            nameError: true,
            formError: true
          })
        } else {
          let err = this.state.costError || this.state.categoryError
          this.setState({
            nameError: false,
            formError: err
          })
        }
      }
    }
  }

  handleSubmit = e => {
    const { endDate, name, category, cost, isPhoneVisible } = this.state
    const { item, appMessages, setCategory, setSubCategory } = this.props
    if (category.slug === '') {
      this.setState({
        categoryError: true,
        formError: true
      })
      return
    }
    if (
      isNaN(cost) ||
      cost.length < 1 ||
      parseFloat(cost) < 0 ||
      parseFloat(cost) > 1000000
    ) {
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
    formData.append('end_date', endDate)
    formData.append('name', name)
    formData.append('category', category.slug)
    formData.append('cost', cost)
    formData.append('is_phone_visible', isPhoneVisible)
    if (item) {
      this.props.updateRequestItem(formData, item.id)
      this.props.handleDimmer(e)
    } else {
      this.props.addRequestItem(formData)
      toast({
        type: 'success',
        title: 'Item added succesfully',
        animation: 'fade up',
        icon: 'smile outline',
        time: 4000
      })
    }
    if (this.props.scrollDiv) {
      this.props.scrollDiv()
    }
    setCategory('')
    setSubCategory('')
  }

  handleCategoryChange = (e, { value, name, slug }) => {
    let result = false
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
          <Dropdown.Item
            styleName='category-item'
            onClick={this.handleCategoryChange}
            value={category.name}
            slug={category.slug}
            name={category.name}
            key={index}
          >
            {category.name}
          </Dropdown.Item>
          {category.subCategories.map((subCategory, i) => {
            return (
              <Dropdown.Item
                styleName='sub-cat'
                value={subCategory.name}
                name={subCategory.name}
                slug={subCategory.slug}
                onClick={this.handleCategoryChange}
                key={i}
              >
                {subCategory.name}
              </Dropdown.Item>
            )
          })}
        </React.Fragment>
      )
    })
    return item
  }

  render () {
    const { user, item, appMessages } = this.props
    const {
      formError,
      costError,
      nameError,
      categoryError,
      endDate
    } = this.state

    const dateCurrent = new Date()
    dateCurrent.setDate(dateCurrent.getDate() + 1)

    return (
      <Grid.Column width={16}>
        <Grid padded stackable styleName={!item ? 'grid-cont' : ''}>
          {appMessages.requestItemMessage.status !== null ? (
            <Grid.Row centered>
              <Grid.Column width={8}>
                {!appMessages.requestItemMessage.status ? (
                  <Message negative>
                    <Message.Header>
                      {appMessages.requestItemMessage.value}
                    </Message.Header>
                  </Message>
                ) : (
                  <Message success>
                    <Message.Header>
                      {appMessages.requestItemMessage.value}
                    </Message.Header>
                    <p>
                      You can view your item{' '}
                      <Link to='/buy_and_sell/request'>here</Link>
                    </p>
                  </Message>
                )}
              </Grid.Column>
            </Grid.Row>
          ) : null}
          {!item ? (
            <Grid.Row styleName='heading-row' centered>
              <Grid.Column width={8}>
                <Header as={'h2'} dividing>
                  Request an item
                </Header>
              </Grid.Column>
            </Grid.Row>
          ) : null}
          <Grid.Row centered>
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
                    placeholder='Item name'
                  />
                  {nameError ? (
                    <Message error content={`Field is empty or invalid name`} />
                  ) : null}
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
                    <Dropdown.Menu>{this.dropdown()}</Dropdown.Menu>
                  </Dropdown>
                  {categoryError ? (
                    <Message error content={`Category field can't be empty.`} />
                  ) : null}
                </Form.Field>
                <Form.Field styleName='field-form' required>
                  <label>Expires On</label>
                  <Responsive {...Responsive.onlyMobile}>
                    <DateInput
                      closable
                      name='endDate'
                      minDate={dateCurrent}
                      placeholder='Expires on'
                      value={endDate}
                      iconPosition='left'
                      inline
                      required
                      dateFormat='YYYY-MM-DD'
                      onChange={this.handleChange}
                    />
                  </Responsive>
                  <Responsive minWidth={Responsive.onlyMobile.maxWidth + 1}>
                    <DateInput
                      closable
                      popupPosition='bottom center'
                      name='endDate'
                      minDate={new Date()}
                      placeholder='Expires on'
                      value={endDate}
                      iconPosition='left'
                      required
                      dateFormat='YYYY-MM-DD'
                      onChange={this.handleChange}
                    />
                  </Responsive>
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
                    placeholder='Price'
                  />
                </Form.Field>
                {costError ? (
                  <Message
                    error
                    content='Price can only range between 0 to 1000000.'
                  />
                ) : null}
                <Form.Field styleName='field-form'>
                  <label>Email-id</label>
                  <Form.Input
                    styleName='email'
                    disabled
                    readOnly
                    value={
                      user.person
                        ? user.person.contactInformation.emailAddress
                        : ''
                    }
                  />
                </Form.Field>
                <Form.Field styleName='field-form'>
                  <label>Mobile number</label>
                  <Radio
                    label={` ${
                      user.person
                        ? user.person.contactInformation.primaryPhoneNumber
                        : ''
                    }  ( Add mobile number )`}
                    name='isPhoneVisible'
                    onChange={this.toggle}
                    toggle
                  />
                </Form.Field>
                {!item ? (
                  <Form.Field styleName='field-form'>
                    <Button
                      type='submit'
                      disabled={formError}
                      onClick={e => this.handleSubmit(e)}
                      color={getTheme()}
                      floated='right'
                      icon
                      labelPosition='left'
                    >
                      <Icon name='send' />
                      {!item ? 'Submit' : 'Update'}
                    </Button>
                  </Form.Field>
                ) : null}
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    )
  }
}
