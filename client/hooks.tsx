import { useQuery } from "@tanstack/react-query";

import * as API from './apiClient'
import { FullTrip } from "../models/trips";
import { Stop } from "../models/stop";
import { LocationData} from "../models/location";


export function useLocations (stopId?: string){
  return useQuery({
    enabled: !!stopId,
    refetchInterval:30000,
    queryKey:['locations', stopId],
    queryFn: async ()=> {
      const res = await API.getLocations(stopId)
      return res as LocationData
    }
  })
}

export function useTrips (stopId?: string){
  return useQuery({
    refetchInterval:30000,
    queryKey:['trips', stopId],
    queryFn: async ()=> {
      const res = await API.getTrips(stopId)
      return res as FullTrip[]
    }
  })
}

export function useStops (){
  return useQuery({
    queryKey:['stops'],
    queryFn: async ()=> {
      const res = await API.getStops()
      return res as Stop[]
    }
  })  
}