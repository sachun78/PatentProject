import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import apiRoute from './routes/api'
import cors from 'cors'
import helmet from 'helmet'
import envConfig from 'config'
import { csrfCheck } from 'middleware/csrf'

const PORT: number = envConfig.host.port;

export default class Server {
  app: express.Application = express()

  constructor() {
    this.setup()
  }

  setup() {
    this.app.use(express.json())
    this.app.use(helmet())
    this.app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'http://192.168.11.108:3000'] }))
    this.app.use(express.static('uploads'))
    this.app.use(cookieParser())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan('dev'))
    this.app.use(compression())

    this.app.use(csrfCheck)
    this.app.use('/api', apiRoute)
  }

  start() {
    try {
      this.app.listen(PORT, () => {
        console.log(`server is running on port : ${PORT}`)
      })
    } catch (e) {
      console.log(e)
    }
  }
}
