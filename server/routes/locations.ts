import express from 'express'
import request from 'superagent'
import 'dotenv/config'
import { getTrips } from '../transform'

const apiKey = process.env.subscription_key
const router = express.Router()

router.get('/', async (req, res) => {
  const date = new Date()

  const nztFormattedDate = date.toLocaleString('en-US', {
    timeZone: 'Pacific/Auckland',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const [month, day, year] = nztFormattedDate.split('/')
  const finalFormattedDate = `${year}-${month}-${day}`
  const currentHour = date.getHours()
  console.log(currentHour)
  try {
    const response = await request
      .get(
        `https://api.at.govt.nz/gtfs/v3/stops/7151-93995941/stoptrips?filter[date]=${finalFormattedDate}&filter[start_hour]=${currentHour}&filter%5Bhour_range%5D=1`,
      )
      .set('Ocp-Apim-Subscription-Key', `${apiKey}`)
    const stop = JSON.parse(response.text)
    const trips = getTrips(stop)

    const locations = await request
      .get(
        `https://api.at.govt.nz/realtime/legacy/vehiclelocations?tripid=${trips}`,
      )
      .set('Ocp-Apim-Subscription-Key', `${apiKey}`)

    res.json({
      data: locations.text,
    })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})
export default router

