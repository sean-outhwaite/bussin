import express from 'express'
import request from 'superagent'
import 'dotenv/config'
import { TripWithDelay } from '../../models/trips'

const apiKey = process.env.subscription_key
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    // Fetch trips for the specific stop that haven't arrived yet
    const response = await request.get('http://localhost:3000/api/v1/trips')
    const trips = JSON.parse(response.text).map((t: TripWithDelay)=>{
      return t.attributes.trip_id
    })

    // Fetch locations for those active trips
    const locations = await request
      .get(
        `https://api.at.govt.nz/realtime/legacy/vehiclelocations?tripid=${trips}`,
      )
      .set('Ocp-Apim-Subscription-Key', `${apiKey}`)

    res.json(
      locations.text,
    )
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default router

