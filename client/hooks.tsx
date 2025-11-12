import { useQuery } from "@tanstack/react-query";

import * as API from './apiClient'

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