
export function filterDeparted(trips, date){
const currentTrips = trips.filter((t)=> {
      const dateString = new Date(date + t.attributes.arrival_time)
      const unixTime = dateString.getTime()

      return unixTime + (t.delay * 1000) > new Date().getTime()
    })
return currentTrips
  }

export function calcEta(trips, date){
    const fullTrips = trips.map((t)=>{
    const dateObj = new Date(date + t.attributes.arrival_time)
    const time = dateObj.getTime() + (t.delay * 1000)
    const compareTime = new Date().getTime()

    const timeString = new Date(time).toTimeString().slice(0,8)
    const diff = (time - compareTime) / 1000

    return {...t, actual: timeString  ,arrival: diff > 60 ? `${Math.round(diff / 60)} min` : `Now`}
    })
    return fullTrips
}