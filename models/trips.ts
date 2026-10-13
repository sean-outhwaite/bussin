export interface Trips {
    type:       Type;
    id:         string;
    attributes: Attributes;
}

export interface Attributes {
    arrival_time:    string;
    departure_time:  string;
    direction_id:    number;
    drop_off_type:   number;
    pickup_type:     number;
    route_id:        string;
    service_date:    Date;
    shape_id:        string;
    stop_headsign:   string;
    stop_id:         string;
    stop_sequence:   number;
    trip_headsign:   string;
    trip_id:         string;
    trip_start_time: string;
}

export enum Type {
    Stoptrip = "stoptrip",
}

export interface TripWithDelay extends Trips{
  delay: number
}

export interface FullTrip extends Trips{
  delay: number,
  actualArrival: string,
  scheduledArrival: string
}
