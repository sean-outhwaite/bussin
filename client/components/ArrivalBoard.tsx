import {  useTrips } from '../hooks.tsx'

const ArrivalBoard = ()=> {
  const {data, isError, isPending, error} = useTrips()

  if (isPending) return <img src='/giphy.gif' alt='moving bus'/>

  if (isError) {
    console.log(error)
    return <p>There was an error</p>
  }

  // Adds delay to scheduled time
  const timeConvert = function(t: string, d: number){
    const dateObj = new Date(`2025-11-17T${t}`)

    const time = dateObj.getTime() + (d * 1000)
    console.log(dateObj.getTime())

    const arrival = new Date(time).toLocaleTimeString('en-US')
   return arrival
  }

  return (

   <>
   <main className='grid grid-cols-2 md:grid-cols-3 gap-4'>
   {data.map((t)=> (
    <div key={t.id}className='bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium'>
      <p className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>{t.attributes.route_id}</p>
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

