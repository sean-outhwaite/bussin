import { FullTrip, TripWithDelay } from '../models/trips'

export function filterDeparted(trips: TripWithDelay[], date: string) {
  const currentTrips = trips.filter((t) => {
    const dateString = new Date(date + t.attributes.arrival_time)
    const unixTime = dateString.getTime()

    return unixTime + t.delay * 1000 > new Date().getTime()
  })
  return currentTrips
}

export function calcEta(trips: TripWithDelay[], date: string): FullTrip[] {
  const fullTrips = trips.map((t) => {
    const dateObj = new Date(date + t.attributes.arrival_time)
    const time = dateObj.getTime() + t.delay * 1000
    const compareTime = new Date().getTime()

    const timeString = new Date(time).toTimeString().slice(0, 8)
    const diff = (time - compareTime) / 1000

    return {
      ...t,
      actualArrival: timeString,
      scheduledArrival: diff > 60 ? `${Math.round(diff / 60)} min` : `Now`,
    }
  })
  return fullTrips
}

export function getAucklandDate() {
  const date = new Date()

  const nztFormattedDate = date.toLocaleString('en-US', {
    timeZone: 'Pacific/Auckland',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const [month, day, year] = nztFormattedDate.split('/')
  const finalFormattedDate = `${year}-${month}-${day}`
  const currentHour = date.getHours()

  const dateTemplate = `${year}-${month}-${day}T`
  return { finalFormattedDate, currentHour, dateTemplate }
}
