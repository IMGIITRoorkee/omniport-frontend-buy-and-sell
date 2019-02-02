import axios from 'axios'
import { saleProductUrl, pictureUrl } from '../constants/urls'
import { SALE_ITEM_ADD_MESSAGE } from '../constants/action-types'

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
        if (response.statusText == 'Created') {
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
                .then(res => {
                  const response = {
                    messageType: 'success',
                    value: 'Your item has been added to Sale items.'
                  }
                  dispatch({
                    type: SALE_ITEM_ADD_MESSAGE,
                    payload: response
                  })
                })
                .catch(error => {
                  const response = {
                    messageType: 'error',
                    value:
                      'Sorry. There seems to be an error, some of the images could not be added. Please try again'
                  }
                  dispatch({
                    type: SALE_ITEM_ADD_MESSAGE,
                    payload: response
                  })
                })
            }
          })
        }
      })
      .catch(error => {
        const response = {
          messageType: 'negative',
          value: 'Sorry. There has been an error. Please try again!'
        }
        dispatch({
          type: SALE_ITEM_ADD_MESSAGE,
          payload: response
        })
      })
  }
}
