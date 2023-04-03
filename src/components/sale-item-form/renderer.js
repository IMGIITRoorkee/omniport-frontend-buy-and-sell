import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'
import {
  Grid,
  Icon,
  Message,
  Radio,
  Button,
  Dropdown,
  Form,
  Header,
  Image,
  TextArea,
  Responsive
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { DateInput } from 'semantic-ui-calendar-react'
import { getTheme } from 'formula_one'
import './index.css'

class UploadButton extends React.Component {
  render () {
    return (
      <>
        <input
          styleName={this.props.styles.image}
          type='file'
          accept='image/*'
          onChange={this.props.onChange}
          count={this.props.count}
          name={`picture${this.props.count}`}
          id={`uploadPhoto${this.props.count}`}
        />
        <label
          styleName={this.props.styles.label}
          htmlFor={`uploadPhoto${this.props.count}`}
        >
          <Icon
            styleName='upload-btn'
            name='upload'
          />
        </label>
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
        details: '',
        cost: '',
        rent: '',
        warrantyDetail: '',
        isPhoneVisible: false,
        paymentModes: [],
        isRental: false,
        periodicity: '',
        securityDeposit: '',
        maxRentPeriod: '',
        pictures: ['', '', ''],
        picturesUrl: ['', '', ''],
        nameError: false,
        costError: false,
        categoryError: false,
        depositError: false,
        rentError: false,
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
      let costPrice =''
      let rentPrice = ''
      let maxRent = ''
      let warranty = ''
      if(item.isRental){
        rentPrice = item.cost
        maxRent = item.warrantyDetail
      }
      else{
        costPrice=item.cost
        warranty = item.warrantyDetail
      }
      
      this.state = {
        endDate: item.endDate,
        name: item.name,
        category: {
          name: categoryName,
          slug: item.category
        },
        cost: costPrice,
        rent: rentPrice,
        details: item.details,
        warrantyDetail: warranty,
        isPhoneVisible: item.isPhoneVisible,
        paymentModes: item.paymentModes,
        periodicity: item.periodicity,
        isRental: item.isRental,
        securityDeposit: item.securityDeposit,
        maxRentPeriod: maxRent,
        nameError: false,
        costError: false,
        categoryError: false,
        depositError: false,
        rentError: false,
        formError: false
      }
    }
  }

  componentDidMount () {
    this.props.getPayment()
    this.props.getConstants()
    const { item, shareSubmit } = this.props
    if (item) {
      shareSubmit(this.handleSubmit.bind(this))
    }
    if(this.props.scrollDiv){
    this.props.scrollDiv()
    }
  }

  componentDidUpdate (prevProps) {
    if (
      this.props.appMessages.saleItemMessage !==
      prevProps.appMessages.saleItemMessage
    ) {
      const { appMessages } = this.props
      if (appMessages.saleItemMessage.status) {
        this.setState({
          endDate: '',
          name: '',
          category: {
            name: '',
            slug: ''
          },
          details: '',
          cost: '',
          rent: '',
          warrantyDetail: '',
          isPhoneVisible: false,
          paymentModes: [],
          periodicity: '',
          isRental: false,
          periodicity: '',
          securityDeposit: '',
          maxRentPeriod: '',
          pictures: ['', '', ''],
          picturesUrl: ['', '', ''],
          nameError: false,
          costError: false,
          categoryError: false,
          depositError: false,
          rentError: false,
          formError: true
        })
      }
    }
  }

  componentWillUnmount () {
    this.props.updateMessage()
  }

  toggle = () => this.setState({ isPhoneVisible: !this.state.isPhoneVisible })

  handleChangePhone = (event, { name }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: !this.state[name] })
    }
  }

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
          })
        } else {
          this.setState({
            costError: false,
          })
        }
      } else if (name === 'name') {
        if (!isNaN(value) && value.length > 0) {
          this.setState({
            nameError: true,
          })
        } else {
          this.setState({
            nameError: false,
          })
        }
      } else if(name === 'securityDeposit') {
        if (
          isNaN(value) ||
          parseFloat(value) < 0 ||
          parseFloat(value) > 1000000
        ) {
          this.setState({
            depositError: true,
          })
        } else {
          this.setState({
            depositError: false,
          })
        }
      } else if(name === 'rent') {
        if (
          isNaN(value) ||
          parseFloat(value) < 0 ||
          parseFloat(value) > 1000000
        ) {
          this.setState({
            rentError: true,
          })
        } else {
          this.setState({
            rentError: false,
          })
        }
      }
      if(this.state.isRental){
        
        let err = this.state.nameError || this.state.categoryError || this.depositError ||
                  this.state.rentError
        this.setState({
          costError: false,
          formError: err
        })
      }
      else{
        let err = this.state.nameError || this.state.categoryError || this.state.costError
        this.setState({
          rentError: false,
          depositError: false,
          formError: err
        })
      }
    }
  }

  handleSelectPicture = e => {
    if (e.target.files && e.target.files.length > 0) {
      const newPictures = this.state.pictures.slice()
      const newPicturesUrl = this.state.picturesUrl.slice()
      let count = e.target.getAttribute('count')
      newPictures[count] = e.target.files[0]
      newPicturesUrl[count] = URL.createObjectURL(e.target.files[0])
      this.setState({
        pictures: newPictures,
        picturesUrl: newPicturesUrl
      })
    }
  }

  handlePaymentChange = (event, { value }) => {
    this.setState({ paymentModes: value })
  }

  handlePeriodicityChange = (event, {value}) => {
    this.setState({ periodicity: value})
  }


  handleCategoryChange = (e, { value, name, slug }) => {
    let result = false
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
  handleImgClose = (e, key) => {
    let newPictures = this.state.pictures
    let newPicturesUrl = this.state.picturesUrl
    newPictures[key] = ''
    newPicturesUrl[key] = ''
    this.setState({
      pictures: newPictures,
      picturesUrl: newPicturesUrl
    })
  }

  handleSaleTypeChange = (e, { value }) => {

    this.setState({ isRental: value })
  }

  handlePeriodicity = () => {
    if (this.state.periodicity === '' || 
        this.state.periodicity === 'lfs' ){
          return 'day'
    }
    return this.state.periodicity

  }
  
  handleSubmit = e => {
    const {
      name,
      rent,
      pictures,
      category,
      paymentModes,
      endDate,
      details,
      cost,
      warrantyDetail,
      maxRentPeriod,
      isPhoneVisible,
      isRental,
      periodicity,
      securityDeposit,
      
    } = this.state
    const { item,
            setCategory,
            setSubCategory
          } = this.props
    if (category.slug === '') {
      this.setState({
        categoryError: true,
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

    if(isRental){
      if (
        isNaN(rent) ||
        rent.length < 1 ||
        parseFloat(rent) < 0 ||
        parseFloat(rent) > 1000000
      ) {
        this.setState({
          rentError: true,
          formError: true
        })
        return
      }
      if (
        isNaN(securityDeposit) ||
        parseFloat(securityDeposit) < 0 ||
        parseFloat(securityDeposit) > 1000000
      ) {
        this.setState({
          depositError: true,
          formError: true,
        })
        return
      }
      this.setState({
        costError: false,
      })

    }
    else {
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
      this.setState({
        rentError:false,
        depositError: false,

      })
    }
    if(this.state.formError){
      return
    }

    let formData = new FormData()
    formData.append('end_date', endDate)
    formData.append('name', name)
    formData.append('category', category.slug)
    formData.append('details', details)
    
    formData.append('is_phone_visible', isPhoneVisible)
    paymentModes.map(mode => {
      formData.append('payment_modes', mode)
    })
    formData.append('is_rental', isRental)
    
    if(isRental){
      formData.append('cost', rent)
      formData.append('warranty_detail', maxRentPeriod)
      formData.append('security_deposit', securityDeposit)
      if(periodicity==='' || periodicity==='lfs'){
        formData.append('periodicity', 'day')
      }
      else{
        formData.append('periodicity', periodicity)
      }

    }
    else{
      formData.append('cost', cost)
      formData.append('warranty_detail', warrantyDetail)
      formData.append('periodicity', 'lfs')
      formData.append('security_deposit', '0')


    }
    if (item) {
      this.props.updateSaleItem(formData, item.id)
      this.props.handleDimmer(e)
    } else {
      this.props.addSaleItem(formData, pictures)
    }
    if(this.props.scrollDiv){
      this.props.scrollDiv()
      }
    setCategory('')
    setSubCategory('')
  }

  
  render () {
    const { user, item, appMessages } = this.props
    const {
      categoryError,
      picturesUrl,
      nameError,
      depositError,
      pictures,
      cost,
      rent,
      formError,
      rentError,
      endDate,
      category,
      warrantyDetail,
      details,
      name,
      costError,
      isRental,
      periodicity,
      securityDeposit,
      maxRentPeriod,

    } = this.state
    const paymentModes = this.props.paymentModes.map((mode, index) => {
      return {
        key: mode.name,
        value: mode.name,
        text: mode.name
      }
    })
    const constants = this.props.constants
    let periods = [];
    for (var i in constants.periodicity) {
      periods.push({
        key: i.toString(),
        text: constants.periodicity[i].toString(),
        value: i.toString(),
      });
    }
    periods.pop()
    


    const dateCurrent = new Date();
    dateCurrent.setDate(dateCurrent.getDate() + 1);

    return (
      <Grid.Column width={16}>
        <Grid padded stackable styleName={!item ? 'grid-cont' : ''}>
          {appMessages.saleItemMessage.status !== null ? (
            <Grid.Row centered>
              <Grid.Column width={8}>
                {!appMessages.saleItemMessage.status ? (
                  <Message negative>
                    <Message.Header>
                      {appMessages.saleItemMessage.value}
                    </Message.Header>
                  </Message>
                ) : (
                  <Message success>
                    <Message.Header>
                      {appMessages.saleItemMessage.value}
                    </Message.Header>
                    <p>
                      You can view your item{' '}
                      <Link to='/buy_and_sell/buy/'>here</Link>
                    </p>
                  </Message>
                )}
              </Grid.Column>
            </Grid.Row>
          ) : null}

          {!item ? (
            <Grid.Row styleName='heading-row' centered>
              <Grid.Column width={8}>
                <Header dividing as={'h2'}>
                  Create Listing
                </Header>
              </Grid.Column>
            </Grid.Row>
          ) : null}
          <Grid.Row centered>
            <Grid.Column width={`${!item ? 8 : 14}`}>
              <Form attachted={'top'} error={formError} encType='multiple/form-data'>
                <Form.Field styleName='field-form' required>
                  <label>Item name</label>
                  <Form.Input
                    name='name'
                    onChange={this.handleChange}
                    value={name}
                    required
                    placeholder='Item name'
                  />
                </Form.Field>
                {nameError ? (
                  <Message error content={`Field is empty or invalid name`} />
                ) : null}
                <Form.Group styleName='field-group' widths={'equal'}>
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
                      <Dropdown.Menu>{this.dropdown()}</Dropdown.Menu>
                    </Dropdown>
                    {categoryError ? (
                      <Message
                        error
                        content={`Category field can't be empty.`}
                      />
                    ) : null}
                  </Form.Field>
                  <Form.Field styleName='field-form'>
                    <label>Accepted modes of payment</label>
                    <Dropdown
                      placeholder='Payment modes'
                      fluid
                      multiple
                      value={this.state.paymentModes}
                      selection
                      onChange={this.handlePaymentChange}
                      options={paymentModes}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Field styleName='field-form'>
                  <label>Description</label>
                  <TextArea
                    autoHeight
                    placeholder='Description of the product'
                    name='details'
                    onChange={this.handleChange}
                    value={details}
                  />
                </Form.Field>
                <Form.Group styleName='field-form' inline>
                    <label>Listing Type</label>
                    <Form.Radio
                      label='Rental'
                      value={true}
                      checked={isRental}
                      onChange={this.handleSaleTypeChange}
                    />
                    <Form.Radio
                      label='Sale'
                      value={false}
                      checked={!isRental}
                      onChange={this.handleSaleTypeChange}
                    />
                </Form.Group>
                {isRental ? 
                  (
                    <div>
                    <Form.Group styleName='field-group' widths={'equal'}>
                      <Form.Field required styleName='field-form'>
                        <label>Security Deposit</label>
                        <Form.Input
                          name='securityDeposit'
                          onChange={this.handleChange}
                          value={securityDeposit}
                          required
                          placeholder='Security Deposit'
                        />
                        {depositError ? (
                          <Message
                            error
                            size='tiny'
                            compact
                            content='Security Deposit can  between 0 to 10 lakh.'
                          />
                        ) : null}
                      </Form.Field>
                      <Form.Field styleName='field-form'>
                        <label>Maximum Renting Period</label>
                        <Form.Input
                          name='maxRentPeriod'
                          value={maxRentPeriod}
                          onChange={this.handleChange}
                          placeholder='For eg. 3 months'
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group styleName='field-group'>
                        <Form.Field required styleName='field-form'>
                          <label>Renting Charges</label>
                          <Form.Input
                          name='rent'
                          onChange={this.handleChange}
                          value={rent}
                          required
                          placeholder='Renting Charges'
                          />
                          {rentError ? (
                          <Message
                            error
                            size='tiny'
                            compact
                            content='Renting charges can  between 0 to 10 lakh.'
                          />
                        ) : null}
                        </Form.Field>
                        <Form.Field styleName='field-form-drop'>
                          <Dropdown
                            placeholder='Period'
                            button
                            
                            value={this.handlePeriodicity()}
                            onChange={this.handlePeriodicityChange}
                            options={periods}
                            styleName='drop-width'
                            
                          />
                        </Form.Field>
                    </Form.Group>
                    </div>
                  ) 
                : 
                  (
                    <Form.Group styleName='field-group' widths={'equal'}>
                      <Form.Field required styleName='field-form'>
                        <label>Price</label>
                        <Form.Input
                          name='cost'
                          onChange={this.handleChange}
                          value={cost}
                          required
                          placeholder='Price'
                        />
                        {costError ? (
                          <Message
                            error
                            size='tiny'
                            compact
                            content='Sale price can  between 0 to 10 lakh.'
                          />
                        ) : null}
                      </Form.Field>
                      <Form.Field styleName='field-form'>
                        <label>State of warranty</label>
                        <Form.Input
                          name='warrantyDetail'
                          value={warrantyDetail}
                          onChange={this.handleChange}
                          placeholder='For eg. 3 months left'
                        />
                      </Form.Field>
                    </Form.Group>
                  )
                }
                

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

                <Form.Field styleName='field-form'>
                  <label>Email-id</label>
                  <Form.Input
                    styleName='email'
                    readOnly
                    disabled
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
                    toggle
                    label={` ${
                      user.person
                        ? user.person.contactInformation.primaryPhoneNumber
                        : ''
                    }  ( Add mobile number )`}
                    name='isPhoneVisible'
                    onChange={this.toggle}
                    defaultChecked={item ? item.isPhoneVisible : false}
                  />
                </Form.Field>
                {!item ? (
                  <Form.Field styleName='field-form'>
                    <label>Upload Images</label>
                    <div styleName='img-add-div'>
                      {!pictures[0] ? (
                        <UploadButton
                          onChange={this.handleSelectPicture}
                          count={'0'}
                          styles={style}
                        />
                      ) : (
                        <div styleName='img-div'>
                          <Image
                            styleName='upload-img'
                            src={picturesUrl[0]}
                            rounded
                          />
                          <Icon
                            onClick={e => this.handleImgClose(e, 0)}
                            key={0}
                            circular
                            inverted
                            link
                            name='close'
                            styleName='close-btn'
                          />
                        </div>
                      )}
                      {pictures[0] && !pictures[1] ? (
                        <UploadButton
                          onChange={this.handleSelectPicture}
                          count={'1'}
                          styles={style}
                        />
                      ) : (
                        <>
                          {pictures[1] ? (
                            <div styleName='img-div'>
                              <Image
                                styleName='upload-img'
                                src={picturesUrl[1]}
                                rounded
                              />
                              <Icon
                                onClick={e => this.handleImgClose(e, 1)}
                                key={1}
                                circular
                                inverted
                                link
                                name='close'
                                styleName='close-btn'
                              />
                            </div>
                          ) : null}
                        </>
                      )}
                      {pictures[0] && pictures[1] && !pictures[2] ? (
                        <UploadButton
                          onChange={this.handleSelectPicture}
                          count={'2'}
                          styles={style}
                        />
                      ) : (
                        <>
                          {pictures[2] ? (
                            <div styleName='img-div'>
                              <Image
                                styleName='upload-img'
                                src={picturesUrl[2]}
                                rounded
                              />
                              <Icon
                                onClick={e => this.handleImgClose(e, 2)}
                                key={2}
                                circular
                                inverted
                                link
                                name='close'
                                styleName='close-btn'
                              />
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </Form.Field>
                ) : null}
                {!item ? (
                  <Form.Field>
                    <Button
                      type='submit'
                      onClick={this.handleSubmit}
                      disabled={formError}
                      position='right'
                      floated='right'
                      color={getTheme()}
                      icon
                      labelPosition='left'
                    >
                      <Icon name='send' />
                      Submit
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
