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


  try {
    // Fetches static schedule data
    const response = await request
      .get(
        `https://api.at.govt.nz/gtfs/v3/stops/7151-93995941/stoptrips?filter[date]=${finalFormattedDate}&filter[start_hour]=${currentHour -1}&filter%5Bhour_range%5D=3`,
      )
      .set('Ocp-Apim-Subscription-Key', `${apiKey}`)

    const stop: {data:Trips[]} = JSON.parse(response.text)

    const ids = stop.data.map((t)=> t.attributes.trip_id)
    // Fetches trip updates from the live API
    const updates = await request
          .get(
            `https://api.at.govt.nz/realtime/legacy/tripupdates?tripid=${ids}`,
          )
          .set('Ocp-Apim-Subscription-Key', `${apiKey}`)

    const delays: Entity[] = JSON.parse(updates.text).response.entity

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
    const currentTrips = withDelays.filter((t)=> {
      const dateString = new Date(dateTemplate + t.attributes.arrival_time)
      const unixTime = dateString.getTime()

      return unixTime + (t.delay * 1000) > date.getTime()
    })

    // Adds the ETA and Actual arrival times
    const fullTrips = currentTrips.map((t)=>{
    const dateObj = new Date(`${year}-${month}-${day}T${t.attributes.arrival_time}`)
    const time = dateObj.getTime() + (t.delay * 1000)
    const compareTime = date.getTime()

    const timeString = new Date(time).toTimeString().slice(0,8)
    const diff = (time - compareTime) / 1000

    return {...t, actual: timeString  ,arrival: diff > 60 ? `${Math.round(diff / 60)} min` : `Now`}
    })

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