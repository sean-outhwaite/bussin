import {  useTrips } from '../hooks.tsx'
import { useOutletContext } from 'react-router'
import { pageOutletContext } from './App.tsx'
import { useEffect } from 'react'

const ArrivalBoard = ()=> {
  const {data, isError, isPending, error} = useTrips()
  const {setPage} = useOutletContext<pageOutletContext>()

  useEffect(()=>{
    setPage('board')
  },[setPage])
  

  
  if (isPending) return <img src='/giphy.gif' alt='moving bus'/>

  if (isError) {
    console.log(error)
    return <p>There was an error</p>
  }
  // Converts the delay in seconds to a more readable format
  const delayTransformer = function(delay: number){
    if (delay > 0){
      return `${delay > 60 ? `${Math.round(delay / 60)} minutes` : `${delay} seconds`} late`
    } else if (delay < 0){
      return `${delay < -60 ? `${Math.round(delay / 60 * -1)} minutes` : `${delay * -1} seconds`} early`
    } else {
      return 'On time'
    }
  }


  return (

   <>
   <main className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>
   {data.map((t)=> (
    <div key={t.id}className='bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-lg shadow-xs hover:bg-neutral-secondary-medium'>
      <p role='paragraph' className='text-blue-500'>{t.attributes.route_id.slice(0,t.attributes.route_id.indexOf('-'))}</p>
      <p role='paragraph' >Arrival: <span className={`dark:text-green-300 text-green-600 ${(t.arrival === 'Now' || t.arrival === '1 min') && 'animate-pulse' }`}>{t.arrival}</span></p>
      <p role='paragraph' className='lg:text-sm font-normal'>Actual: <span className='font-bold'>{t.actual}</span></p>
      <p role='paragraph' className='lg:text-sm font-normal'>Scheduled: {t.attributes.arrival_time}</p>
      <p role='paragraph' className='lg:text-sm font-normal'>Delay: {delayTransformer(t.delay)}</p>
    </div>

   ))}
     </main>
    </>
  )

}

export default ArrivalBoard

