import express from 'express'
import request from 'superagent'
import 'dotenv/config'
import { Trips } from '../../models/trips'

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

  const routeIDs = [
  '25B-202',
  '25L-202',
  '27W-202',
  '27H-202',
  '22N-202',
  '22R-202',
  '24R-202',
  '30-202',
]
  try {
    const response = await request
      .get(
        `https://api.at.govt.nz/gtfs/v3/stops/7151-93995941/stoptrips?filter[date]=${finalFormattedDate}&filter[start_hour]=${currentHour}&filter%5Bhour_range%5D=2`,
      )
      .set('Ocp-Apim-Subscription-Key', `${apiKey}`)
    const stop = JSON.parse(response.text)
      const filtered: Trips[]= []

  // const date = new Date()
  // const time = date.toTimeString().slice(0,8)

    stop.data.forEach((x: Trips )=>{
    if (routeIDs.includes(x.attributes.route_id) )
      filtered.push(x)
    })


    
    res.json(filtered
    )
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})
export default router