export interface LocationData {
  message: string
  data: string
}
export interface stopTrip {
  data: Datum[]
}

export interface Datum {
  type: string
  id: string
  attributes: Attributes
}

export interface Attributes {
  arrival_time: string
  departure_time: string
  direction_id: number
  drop_off_type: number
  pickup_type: number
  route_id: string
  service_date: Date
  shape_id: string
  stop_headsign: string
  stop_id: string
  stop_sequence: number
  trip_headsign: string
  trip_id: string
  trip_start_time: string
}

export interface Locations {
  status: string
  response: Response
  error: null
}

export interface Response {
  header: Header
  entity: Entity[]
}

export interface Entity {
  id: string
  vehicle: EntityVehicle
  is_deleted: boolean
}

export interface EntityVehicle {
  trip: Trip
  position: Position
  timestamp: number
  vehicle: VehicleVehicle
  occupancy_status: 0|1|2|3|4|5|6
}

export interface Position {
  latitude: number
  longitude: number
  bearing: string
  speed: number
}

export interface Trip {
  trip_id: string
  start_time: string
  start_date: string
  schedule_relationship: number
  route_id: string
  direction_id: number
}

export interface VehicleVehicle {
  id: string
  label: string
  license_plate: string
}

export interface Header {
  timestamp: number
  gtfs_realtime_version: string
  incrementality: number
}

export type Poi = { key: string; location: google.maps.LatLngLiteral }

export interface TripUpdate {
    status:   string;
    response: Response;
    error:    null;
}

