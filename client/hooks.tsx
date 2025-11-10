import { useQuery } from "@tanstack/react-query";

import * as API from './apiClient'

export function useLocations (){
  return useQuery({
    queryKey:['locations'],
    queryFn: async ()=> {
      const res = await API.getLocations()
      console.log(res.body)
      return res
    }
  })
}