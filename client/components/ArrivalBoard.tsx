import {  useTrips } from '../hooks.tsx'
// import { tripFilter } from '../locationHandler.ts'


const ArrivalBoard = ()=> {
  const {data, isError, isPending, error} = useTrips()

  if (isPending) return <img src='/giphy.gif' alt='moving bus'/>

  if (isError) {
    console.log(error)
    return <p>There was an error</p>
  }

  // const updates = (tripFilter(JSON.parse(data.data).response.entity))
  const timeConvert = function(t: string, d: number){
    const dateObj = new Date(`2025-11-17T${t}`)

    const time = dateObj.getTime() + (d* 1000)
    console.log(dateObj.getTime())

    const arrival = new Date(time).toLocaleTimeString('en-US')
   return arrival
  }

console.log(data)
  return (

   <>
   {data.map((t)=> (
    <div key={t.id}className='mb-4 text-sm font-extrabold leading-none tracking-tight text-gray-900 md:text-sm lg:text-sm dark:text-white'>
      <p>{t.attributes.route_id}</p>
      <p>{t.attributes.arrival_time}</p>
      <p>{timeConvert(t.attributes.arrival_time, t.delay)}</p>
      <p>{t.delay}</p>
    </div>

   ))}
    </>
  )
}

export default ArrivalBoard

