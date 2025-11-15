import { json } from 'node:stream/consumers'
import { useLocations, useTimes } from '../hooks.tsx'
import { tripFilter } from '../locationHandler.ts'


const ArrivalBoard = ()=> {
  const {data, isError, isPending, error} = useTimes()

  if (isPending) return <img src='/giphy.gif' alt='moving bus'/>

  if (isError) {
    console.log(error)
    return <p>There was an error</p>
  }
  console.log(JSON.parse(data.data))
  const updates = (tripFilter(JSON.parse(data.data).response.entity))
  const timeConvert = function(t){
    const dateObj = new Date(t * 1000)
    return dateObj
  }
  return (

    <>
   {updates.map((t)=> (
    <div key={t.id}>
      <p>{t.trip_update.trip.route_id}</p>
      <p>{String(timeConvert(t.trip_update.stop_time_update.arrival.time))}</p>
    </div>

   ))}
    </>
  )
}

export default ArrivalBoard

