import 'dotenv/config'
import Server from './Server'
import mongoose from 'mongoose'

const url = 'mongodb://192.168.11.108:27017/wemet'
mongoose.connect(url)
  .then(() => {
    console.log('Database Connected OK')
    const server = new Server()
    server.start()
  })
  .catch(err => console.error(err.message))
