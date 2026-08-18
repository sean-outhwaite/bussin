import express from 'express'
import request from 'superagent'
import 'dotenv/config'
import { Stop } from '../../models/stop'

const apiKey = process.env.subscription_key
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await request
      .get(
        `https://api.at.govt.nz/gtfs/v3/stops`,
      )
      .set('Ocp-Apim-Subscription-Key', `${apiKey}`)

    const stops: Stop[] = response.body.data

    const ids = stops.map((s)=> s.id)
    if (ids.length === 0) {
      return res.json([])
    }

    res.json(
      stops,
    )
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default router

