import request from 'superagent'

const rootURL = new URL(`/api/v1`, document.baseURI)


export async function getLocations(stopId?: string) {
  const response = await request.get(`${rootURL}/locations/${stopId}`)
  return response.body
}

export async function getTrips(stopId?: string) {
  const response = await request.get(`${rootURL}/trips/${stopId}`)
  return response.body
}

export async function getStops() {
  const response = await request.get(`${rootURL}/stops`)
  return response.body
}