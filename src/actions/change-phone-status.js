import axios from 'axios'
import { whoAmIUrl } from '../constants/urls'
import { getCookie } from 'formula_one/src/utils'

export const changePhoneStatus = data => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    axios({
      method: 'post',
      url: whoAmIUrl,
      headers: headers,
      data: {
        phone_status: data
      }
    }).then(response => {})
  }
}
