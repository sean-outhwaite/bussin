import {  useTrips } from '../hooks.tsx'

const ArrivalBoard = ()=> {
  const {data, isError, isPending, error} = useTrips()
  const currentTime = new Date()

  if (isPending) return <img src='/giphy.gif' alt='moving bus'/>

  if (isError) {
    console.log(error)
    return <p>There was an error</p>
  }

  // Adds delay to scheduled time
  const timeConvert = function(t: string, d: number){
    const dateObj = new Date(`${currentTime.toISOString().slice(0, currentTime.toISOString().indexOf('T') +1)}${t}`)

    const time = dateObj.getTime() + (d * 1000)


    const arrival = new Date(time).toLocaleTimeString('en-US')
   return arrival
  }

  const timeDiff = function (t:string, d:number){
  const dateObj = new Date(`${currentTime.toISOString().slice(0, currentTime.toISOString().indexOf('T') +1)}${t}`)

    const time = dateObj.getTime() + (d * 1000)
    const compareTime = currentTime.getTime()

    console.log(time, compareTime)

    const diff = (time - compareTime) / 1000

    return diff > 60 ? `${Math.round(diff / 60)} min` : `Now`

  }


  return (

   <>
   <main className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>
   {data.map((t)=> (
    <div key={t.id}className='bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-lg shadow-xs hover:bg-neutral-secondary-medium'>
      <p className='text-blue-500'>{t.attributes.route_id.slice(0,t.attributes.route_id.indexOf('-'))}</p>
      <p >Arrival: <span className='dark:text-green-300 text-green-600'>{timeDiff(t.attributes.arrival_time, t.delay)}</span></p>
      <p className='lg:text-sm font-normal'>Scheduled: {t.attributes.arrival_time}</p>
      <p className='lg:text-sm font-normal'>Actual: {timeConvert(t.attributes.arrival_time, t.delay)}</p>
      <p className='lg:text-sm font-normal'>Delay: {t.delay}</p>
    </div>

   ))}
     </main>
    </>
  )

}

export default ArrivalBoard

