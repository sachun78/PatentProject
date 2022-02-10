import 'dotenv/config'
import Server from './Server'
import { connectDB } from 'database/database'

connectDB()
  .then(() => {
    console.log('Database Connected OK')
    const server = new Server()
    server.start()
  })
  .catch(err => console.error(err.message))
  