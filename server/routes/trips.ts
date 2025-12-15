import express from 'express'
import request from 'superagent'
import 'dotenv/config'
import { Trips } from '../../models/trips'
import { Entity } from '../../models/tripUpdate'
import { calcEta, filterDeparted } from '../eta-utils'

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

  const dateTemplate = `${year}-${month}-${day}T`


  try {
    // Fetches static schedule data
    const response = await request
      .get(
        `https://api.at.govt.nz/gtfs/v3/stops/7151-93995941/stoptrips?filter[date]=${encodeURIComponent(finalFormattedDate)}&filter[start_hour]=${currentHour -1}&filter%5Bhour_range%5D=3`,
      )
      .set('Ocp-Apim-Subscription-Key', `${apiKey}`)

    const stop: {data:Trips[]} = response.body

    const ids = stop.data.map((t)=> t.attributes.trip_id)

     if (ids.length === 0) {
      return res.json([])
    }

    // Fetches trip updates from the live API
    const updates = await request
          .get(
            `https://api.at.govt.nz/realtime/legacy/tripupdates?tripid=${ids}`,
          )
          .set('Ocp-Apim-Subscription-Key', `${apiKey}`)

    const delays: Entity[] = updates.body.response.entity

    // Combines the delays from the trip updates feed with the static schedule data
    const withDelays = stop.data.map((t)=>{
      const delay = delays.find((d)=> d.id === t.attributes.trip_id)
      if (delay){
        return {...t, delay: delay.trip_update.delay}
      } else {
        return {...t, delay:0}
      }
    })

    // Filters any trips which should have departed already
    const currentTrips = filterDeparted(withDelays,dateTemplate)

    // Adds the ETA and Actual arrival times
    const fullTrips = calcEta(currentTrips,dateTemplate)

   fullTrips.sort((a,b)=> a.actual  < b.actual ?   -1 : 1
   )

    res.json(fullTrips
    )
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})
export default router