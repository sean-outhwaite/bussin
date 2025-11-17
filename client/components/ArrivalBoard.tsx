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
   <main className='grid grid-cols-2 md:grid-cols-3 gap-4'>
   {data.map((t)=> (
    <div key={t.id}className='bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium'>
      <p className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>{t.attributes.route_id}</p>
      <p className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>Arrival: {timeDiff(t.attributes.arrival_time, t.delay)}</p>
      <p className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>Scheduled: {t.attributes.arrival_time}</p>
      <p className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>Actual: {timeConvert(t.attributes.arrival_time, t.delay)}</p>
      <p className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>Delay: {t.delay}</p>
    </div>

   ))}
     </main>
    </>
  )

}

export default ArrivalBoard

