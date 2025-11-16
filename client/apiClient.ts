import request from 'superagent'

const rootURL = new URL(`/api/v1`, document.baseURI)


export async function getLocations() {
  const response = await request.get(`${rootURL}/locations`)
  return response.body
}

export async function getTimes() {
  const response = await request.get(`${rootURL}/times`)
  return response.body
}


export async function getTrips() {
  const response = await request.get(`${rootURL}/trips`)
  return response.body
}

