import { useQuery } from "@tanstack/react-query";

import * as API from './apiClient'
import { FullTrip } from "../models/trips";


export function useLocations (){
  return useQuery({
    refetchInterval:30000,
    queryKey:['locations'],
    queryFn: async ()=> {
      const res = await API.getLocations()
      return res
    }
  })
}

export function useTrips (){
  return useQuery({
    refetchInterval:30000,
    queryKey:['trips'],
    queryFn: async ()=> {
      const res = await API.getTrips()
      return res as FullTrip[]
    }
  })
}