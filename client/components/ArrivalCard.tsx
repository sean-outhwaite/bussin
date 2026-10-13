import { FullTrip } from '../../models/trips'

interface props {
  trip: FullTrip
}

const ArrivalCard = ({ trip }: props) => {
  const delayTransformer = function (delay: number) {
    if (delay === 0) return 'On Time'

    const status = delay < 0 ? 'early' : 'late'

    if (delay < 0) delay *= -1

    return `${delay > 60 ? `${Math.round(delay / 60)} minutes` : `${delay} seconds`} ${status}`
  }

  return (
    <div
      key={trip.id}
      className="border-default block max-w-sm rounded-lg border bg-slate-50 p-6 shadow-md dark:bg-gray-900"
    >
      <p role="paragraph" className="text-blue-500">
        {trip.attributes.route_id.slice(
          0,
          trip.attributes.route_id.indexOf('-'),
        )}
      </p>
      <p role="paragraph">
        Arrival:{' '}
        <span
          className={`text-green-600 dark:text-green-300 ${(trip.scheduledArrival === 'Now' || trip.scheduledArrival === '1 min') && 'animate-pulse'}`}
        >
          {trip.scheduledArrival}
        </span>
      </p>
      <p role="paragraph" className="font-normal lg:text-sm">
        Actual: <span className="font-bold">{trip.actualArrival}</span>
      </p>
      <p role="paragraph" className="font-normal lg:text-sm">
        Scheduled: {trip.attributes.arrival_time}
      </p>
      <p role="paragraph" className="font-normal lg:text-sm">
        Delay: {delayTransformer(trip.delay)}
      </p>
    </div>
  )
}
export default ArrivalCard
