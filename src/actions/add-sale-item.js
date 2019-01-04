import axios from 'axios';
import { saleProductUrl, pictureUrl } from '../constants/urls';
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
        }).then((response) => {
            if (response.statusText == 'Created') {
                pictures.map((picture, index) => {
                    let headers = {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRFToken': getCookie('csrftoken'),
                    }
                    if (picture) {
                        let id = response.data.id
                        let formData = new FormData()
                        formData.append('picture', picture)
                        console.log(picture)
                        formData.append('product', id)
                        axios({
                            method: 'post',
                            url: pictureUrl,
                            headers: headers,
                            data: formData
                        }).then((response) => {
                            console.log(response)
                        }).catch((error) => {
                            console.log(error.response.data);
                        });
                    }
                })
            }
        }).catch((error) => {
            console.log(error.response.data);
        });
    }
}