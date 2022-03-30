import axios from 'axios'

const client = axios.create({
  withCredentials: true
})

// client.defaults.baseURL = 'http://192.168.11.108:4000/'
client.defaults.baseURL = 'https://wemet-server.herokuapp.com/'

export default client
