import { Locations } from '../models/location'

type Poi = { key: string; location: google.maps.LatLngLiteral }

export const getLatLong = function (locations: string) {
  const data: Locations = JSON.parse(locations)
  const arr = data.response.entity
  const obj: Poi[] = []


  arr.forEach((loc) => {
    if (Object.keys(loc.vehicle).includes('trip')) {
      obj.push({
        key: loc.vehicle.trip.route_id,
        location: {
          lat: loc.vehicle.position.latitude,
          lng: loc.vehicle.position.longitude,
        },
      })
    }
  })
  return obj
}
