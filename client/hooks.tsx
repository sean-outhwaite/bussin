import { useQuery } from "@tanstack/react-query";

import * as API from './apiClient'
import { TripWithDelay } from "../models/trips";


export function useLocations (){
  return useQuery({
    queryKey:['locations'],
    queryFn: async ()=> {
      const res = await API.getLocations()
      return res
    }
  })
}

export function useTimes (){
  return useQuery({
    queryKey:['times'],
    queryFn: async ()=> {
      const res = await API.getTimes()
      return res
    }
  })
}


export function useTrips (){
  return useQuery({
    queryKey:['trips'],
    queryFn: async ()=> {
      const res = await API.getTrips()
      return res as TripWithDelay[]
    }
  })
}