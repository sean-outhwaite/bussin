import {  useTrips } from '../hooks.tsx'
import { useOutletContext } from 'react-router'
import { pageOutletContext } from '../components/App.tsx'
import { useEffect } from 'react'
import ArrivalCard from '../components/ArrivalCard.tsx'

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

  return (

   <>
   <main className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>
   {data.map((trip)=> (
   <ArrivalCard key={trip.id} trip={trip} />
   ))}
     </main>
    </>
  )

}

export default ArrivalBoard

