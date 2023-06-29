import express, { Router } from 'express'
import request from 'superagent'
import getAuthURL from '../utils/google'

import path from 'path'
import dotenv from 'dotenv'
const envPath = path.join(__dirname, '../../.env')
dotenv.config({ path: envPath })

const router = express.Router()

router.get('/', (req, res, next) => {
  const redirect = getAuthURL()
  res.send(redirect)
})

router.get('/auth:authCode', (req, res) => {
  const authCode = req.params.authCode
  console.log(authCode)
  res.redirect('/')
})

export default router