import request from 'superagent'
import 'dotenv/config'
import { Trips, TripWithDelay, FullTrip } from '../models/trips'
import { Entity } from '../models/tripUpdate'
import { calcEta, filterDeparted, getAucklandDate } from './eta-utils'

const apiKey = process.env.subscription_key

export async function getUpcomingTrips(stopId: string): Promise<FullTrip[]>{
  const { finalFormattedDate, currentHour, dateTemplate } = getAucklandDate()
  const response = await request
        .get(
          `https://api.at.govt.nz/gtfs/v3/stops/${stopId}/stoptrips?filter[date]=${finalFormattedDate}&filter[start_hour]=${currentHour -1}&filter[hour_range]=3`,
        )
        .set('Ocp-Apim-Subscription-Key', `${apiKey}`)
  
      const stop: {data:Trips[]} = response.body
  
      const ids = stop.data.map((t)=> t.attributes.trip_id)
  
       if (ids.length === 0) {
        return []
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
  
     fullTrips.sort((a,b)=> a.actualArrival  < b.actualArrival ?   -1 : 1
     )
  
     return fullTrips
      
}

export async function getBusLocations(trips: string[]): Promise<TripWithDelay[]>{
      // Fetch locations for those active trips
      const locations = await request
        .get(
          `https://api.at.govt.nz/realtime/legacy/vehiclelocations?tripid=${trips}`,
        )
        .set('Ocp-Apim-Subscription-Key', `${apiKey}`)
  
        return locations.body
}

export async function getBusLocationsForStop(stopId: string){
  const trips = await getUpcomingTrips(stopId)
  if (trips.length === 0) return { response: {entity: []}}

  return getBusLocations(trips.map((t)=> t.attributes.trip_id))
}