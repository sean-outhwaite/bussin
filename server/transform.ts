import {  stopTrip } from '../models/location'

// const data = [
//   {
//     type: 'stoptrip',
//     id: 'stop:7151-93995941_trip:1283-02705-26460-2-843aef04',
//     attributes: {
//       arrival_time: '08:00:51',
//       departure_time: '08:00:51',
//       direction_id: 0,
//       drop_off_type: 0,
//       pickup_type: 0,
//       route_id: '27W-202',
//       service_date: '2025-11-03',
//       shape_id: '1283-02705-7c4c3f25',
//       stop_headsign: 'BRITOMART',
//       stop_id: '7151-93995941',
//       stop_sequence: 29,
//       trip_headsign: 'Waikowhai To Britomart Via Mt Eden Rd',
//       trip_id: '1283-02705-26460-2-843aef04',
//       trip_start_time: '07:21:00',
//     },
//   },
//   {
//     type: 'stoptrip',
//     id: 'stop:7151-93995941_trip:1278-02201-26100-2-98139bf5',
//     attributes: {
//       arrival_time: '08:03:47',
//       departure_time: '08:03:47',
//       direction_id: 0,
//       drop_off_type: 0,
//       pickup_type: 0,
//       route_id: '22R-202',
//       service_date: '2025-11-03',
//       shape_id: '1278-02201-e82e4758',
//       stop_headsign: 'CITY CENTRE',
//       stop_id: '7151-93995941',
//       stop_sequence: 38,
//       trip_headsign: 'Rosebank Rd To City Centre Via New North Rd',
//       trip_id: '1278-02201-26100-2-98139bf5',
//       trip_start_time: '07:15:00',
//     },
//   },
// ]

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

export function getTrips(stopTrips: stopTrip) {
  const trips = []

  stopTrips.data.forEach((x) => {
    if (routeIDs.includes(x.attributes.route_id))
      trips.push(x.attributes.trip_id)
  })
  return trips
}
