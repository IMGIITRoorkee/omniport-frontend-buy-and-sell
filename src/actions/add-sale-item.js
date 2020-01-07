import axios from 'axios'
import { saleProductUrl, pictureUrl } from '../constants/urls'
import { SALE_ITEM_ADD_MESSAGE } from '../constants/action-types'

import { toast } from 'react-semantic-toasts'

import { getCookie } from 'formula_one/src/utils'

export const addSaleItem = (data, pictures) => {
  let headers = {
    'Content-Type': 'multipart/form-data',
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    axios({
      method: 'post',
      url: saleProductUrl,
      headers: headers,
      data: data
    })
      .then(response => {
        if (response.statusText === 'Created') {
          let responseData = {
            status: true,
            value: 'Congratulations! item has been added to Sale items.'
          }
          toast({
            type: 'success',
            title: 'Item added succesfully',
            animation: 'fade up',
            icon: 'smile outline',
            time: 4000
          })
          pictures.map((picture, index) => {
            let headers = {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'X-CSRFToken': getCookie('csrftoken')
            }
            if (picture) {
              let id = response.data.id
              let formData = new FormData()
              formData.append('picture', picture)
              formData.append('product', id)
              axios({
                method: 'post',
                url: pictureUrl,
                headers: headers,
                data: formData
              })
            }
          })
          dispatch({
            type: SALE_ITEM_ADD_MESSAGE,
            payload: responseData
          })
        }
      })
      .catch(err => {
        const response = {
          status: false,
          value: 'Sorry. There has been an error. Please try again!'
        }
        toast({
          type: 'error',
          title: 'Error occured.Try again',
          description: err.response.data.error,
          animation: 'fade up',
          icon: 'frown outline',
          time: 4000
        })
        dispatch({
          type: SALE_ITEM_ADD_MESSAGE,
          payload: response
        })
      })
  }
}
