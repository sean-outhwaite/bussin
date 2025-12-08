import { FullTrip } from "../../models/trips"

interface props {
  trip: FullTrip
}

const ArrivalCard = ({trip}: props)=>{


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
  <div key={trip.id}className='bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-lg shadow-xs hover:bg-neutral-secondary-medium'>
      <p role='paragraph' className='text-blue-500'>{trip.attributes.route_id.slice(0,trip.attributes.route_id.indexOf('-'))}</p>
      <p role='paragraph' >Arrival: <span className={`dark:text-green-300 text-green-600 ${(trip.arrival === 'Now' || trip.arrival === '1 min') && 'animate-pulse' }`}>{trip.arrival}</span></p>
      <p role='paragraph' className='lg:text-sm font-normal'>Actual: <span className='font-bold'>{trip.actual}</span></p>
      <p role='paragraph' className='lg:text-sm font-normal'>Scheduled: {trip.attributes.arrival_time}</p>
      <p role='paragraph' className='lg:text-sm font-normal'>Delay: {delayTransformer(trip.delay)}</p>
    </div>)
}
export default ArrivalCard