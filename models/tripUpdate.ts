export interface TripUpdate {
    status:   string;
    response: Response;
    error:    Error;
}

export interface Error {
}

export interface Response {
    header: Header;
    entity: Entity[];
}

export interface Entity {
    id:          string;
    is_deleted:  boolean;
    trip_update: TripUpdateClass;
}

export interface TripUpdateClass {
    trip:             Trip;
    vehicle:          Vehicle;
    stop_time_update: StopTimeUpdate[];
    timestamp:        number;
    delay:            number;
}

export interface StopTimeUpdate {
    stop_sequence:         number;
    stop_id:               Date;
    arrival:               Arrival;
    departure:             Arrival;
    schedule_relationship: number;
}

export interface Arrival {
    delay: number;
    time:  number;
}

export interface Trip {
    trip_id:               string;
    route_id:              string;
    direction_id:          number;
    start_time:            Date;
    start_date:            string;
    schedule_relationship: number;
}

export interface Vehicle {
    id:            string;
    label:         string;
    license_plate: string;
}

export interface Header {
    gtfs_realtime_version: string;
    incrementality:        number;
    timestamp:             number;
}
