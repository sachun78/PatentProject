import axios from 'axios'

const client = axios.create({
  withCredentials: true,
})

export const API_PATH = process.env.REACT_APP_API_PATH

// client.defaults.baseURL = 'http://192.168.11.108:4000/'
client.defaults.baseURL = API_PATH

export default client
