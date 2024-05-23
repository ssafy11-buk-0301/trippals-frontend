import axios from 'axios'

export default axios.create({
  baseURL: 'http://192.168.203.126:8080',
  headers: {
    'Content-Type': 'application/json',
    async: 'true'
  },
  withCredentials: true
})
