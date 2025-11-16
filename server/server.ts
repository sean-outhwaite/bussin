import * as Path from 'node:path'
import express from 'express'
import cors, { CorsOptions } from 'cors'
import locations from './routes/locations.ts'
import times from './routes/times.ts'
import trips from './routes/trips.ts'


const server = express()

server.use(express.json())
server.use(cors('*' as CorsOptions))
server.use('/api/v1/locations', locations)
server.use('/api/v1/times', times)
server.use('/api/v1/trips',trips)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
