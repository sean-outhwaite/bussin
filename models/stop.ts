export interface Stop {
    type:       Type;
    id:         string;
    attributes: Attributes;
}

export interface Attributes {
    location_type:       number;
    stop_code:           string;
    stop_id:             string;
    stop_lat:            number;
    stop_lon:            number;
    stop_name:           string;
    wheelchair_boarding: number;
    parent_station?:     string;
    platform_code?:      string;
}

export type Type = "stop";

export type SelectedStop = Pick<Attributes, 'stop_name' | 'stop_lat' | 'stop_lon' | 'stop_id' | 'stop_code'>