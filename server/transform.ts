import {  stopTrip } from '../models/location'

// const routeIDs = [
//   '25B-202',
//   '25L-202',
//   '27W-202',
//   '27H-202',
//   '22N-202',
//   '22R-202',
//   '24R-202',
//   '30-202',
//   '24B-202'
// ]

export function getTrips(stopTrips: stopTrip) {
  const trips: string[] = []
  const date = new Date()
  const time = date.toTimeString().slice(0,8)

  stopTrips.data.forEach((x) => {
    if (/*routeIDs.includes(x.attributes.route_id) &&*/ x.attributes.arrival_time > time )
      trips.push(x.attributes.trip_id)
  })
  return trips
}
