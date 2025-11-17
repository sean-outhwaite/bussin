import express from 'express'
import request from 'superagent'
import 'dotenv/config'
import { Trips } from '../../models/trips'
import { Entity } from '../../models/tripUpdate'

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
    // Fetches static schedule data
    const response = await request
      .get(
        `https://api.at.govt.nz/gtfs/v3/stops/7151-93995941/stoptrips?filter[date]=${finalFormattedDate}&filter[start_hour]=${currentHour -1}&filter%5Bhour_range%5D=3`,
      )
      .set('Ocp-Apim-Subscription-Key', `${apiKey}`)
    const stop = JSON.parse(response.text)
      const filtered: Trips[]= []

  
  // Filters for the routes I care about
    stop.data.forEach((x: Trips )=>{
    if (routeIDs.includes(x.attributes.route_id) )
      filtered.push(x)
    })

    const ids = filtered.map((t)=> t.attributes.trip_id)
    // Fetches trip updates from the live API
    const updates = await request
          .get(
            `https://api.at.govt.nz/realtime/legacy/tripupdates?tripid=${ids}`,
          )
          .set('Ocp-Apim-Subscription-Key', `${apiKey}`)

    const delays: Entity[] = JSON.parse(updates.text).response.entity


    // Combines the delays from the trip updates feed with the static schedule data
    const withDelays = filtered.map((t)=>{
      const delay = delays.find((d)=> d.id === t.attributes.trip_id)
      if (delay){
        return {...t, delay: delay.trip_update.delay}
      } else {
        return {...t, delay:0}
      }
    })

    const currentTrips = withDelays.filter((t)=> {
      const dateString = new Date(dateTemplate + t.attributes.arrival_time)
      const unixTime = dateString.getTime()

      return unixTime + (t.delay * 1000) > date.getTime()

    })
    console.log(currentTrips)
    res.json(currentTrips
    )
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})
export default router