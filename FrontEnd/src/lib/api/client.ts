import axios from 'axios'

const client = axios.create({
  withCredentials: true,
})

export const API_PATH = process.env.REACT_APP_API_PATH

client.defaults.baseURL = API_PATH // 'https://wemet-server.herokuapp.com/'

export default client
