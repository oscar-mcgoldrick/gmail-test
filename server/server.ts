import express from 'express'
import path from 'path'
import beepRoutes from './routes/beep'
import { servicesVersion } from 'typescript'

const server = express()
// server.get("/api", (req, res) => {
//   res.send("google.com")
// })

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/beep', beepRoutes)

export default server
