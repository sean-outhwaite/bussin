/// <reference types="@types/google.maps" />
import { Locations } from '../models/location'

type PointsOfInterest = { key: string; location: google.maps.LatLngLiteral }

interface OccupancyPointsOfInterest extends PointsOfInterest{
  occ: 0|1|2|3|4|5|6
}

export const getLatLong = function (data: Locations) {
  const arr = data.response.entity
  const activeTrips: OccupancyPointsOfInterest[] = []


  arr.forEach((loc) => {
    if (Object.keys(loc.vehicle).includes('trip')) {
      activeTrips.push({
        key: loc.vehicle.trip.route_id,
        location: {
          lat: loc.vehicle.position.latitude,
          lng: loc.vehicle.position.longitude,
        },
        occ: loc.vehicle.occupancy_status
      })
    }
  })
  return activeTrips
}