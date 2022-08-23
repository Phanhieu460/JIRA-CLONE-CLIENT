import axios from 'axios'
import queryString from 'query-string'

const baseURL= 'http://localhost:1337'
const token = () => localStorage.getItem('token')

const axiosClient = axios.create({
    baseURL: baseURL,

})

axiosClient.interceptors.request.use(async config => {
    return {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token()}`
      }
    }
  })
  
  axiosClient.interceptors.response.use(response => {
    if (response && response.data) return response.data
    return response
  }, err => {
    if (!err.response) {
      return alert(err)
    }
    throw err.response
  })
  
  export default axiosClient