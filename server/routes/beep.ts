import express, { Router } from 'express'
import request from 'superagent'
import {getAuthURL, getToken} from '../utils/google'

import path from 'path'
import dotenv from 'dotenv'
const envPath = path.join(__dirname, '../../.env')
dotenv.config({ path: envPath })

const router = express.Router()

router.get('/', async (req, res, next) => {
  const redirect = await getAuthURL()
  console.log(redirect)
  res.send(redirect)
})

router.post('/', async (req, res) => {
  console.log(req.body.code)
  getToken(req.body.code)
})

export default router