import { useTrips } from '../hooks.tsx'
import { useOutletContext } from 'react-router'
import { pageOutletContext } from '../components/App.tsx'
import ArrivalCard from '../components/ArrivalCard.tsx'

const ArrivalBoard = () => {
  const { selectedStop } = useOutletContext<pageOutletContext>()
  const { data, isError, isPending, error } = useTrips(selectedStop.stop_id)

  if (isPending) return <img src="/giphy.gif" alt="moving bus" />

  if (isError) {
    console.log(error)
    return <p>There was an error</p>
  }

  return (
    <>
      <main className="mb-4 grid grid-cols-2 gap-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:grid-cols-3 md:text-5xl lg:text-2xl dark:text-white">
        {data.map((trip) => (
          <ArrivalCard key={trip.id} trip={trip} />
        ))}
      </main>
    </>
  )
}

export default ArrivalBoard
