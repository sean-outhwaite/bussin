/// <reference types="@types/google.maps" />
import { Locations } from '../models/location'

type Poi = { key: string; location: google.maps.LatLngLiteral }

interface occPoi extends Poi{
  occ: 0|1|2|3|4|5|6
}

export const getLatLong = function (locations: string) {
  const data: Locations = JSON.parse(locations)
  const arr = data.response.entity
  const obj: occPoi[] = []


  arr.forEach((loc) => {
    if (Object.keys(loc.vehicle).includes('trip')) {
      obj.push({
        key: loc.vehicle.trip.route_id,
        location: {
          lat: loc.vehicle.position.latitude,
          lng: loc.vehicle.position.longitude,
        },
        occ: loc.vehicle.occupancy_status
      })
    }
  })
  return obj
}


// export const tripFilter= function(arr){
  
//   const newArr =[]
//   arr.forEach((t)=>{
//     if (t.trip_update.stop_time_update.stop_id == '7151-93995941' && t.trip_update.stop_time_update.arrival) newArr.push(t)
//   })
// console.log(newArr)
// return newArr
// }