import request from 'superagent'

const rootURL = new URL(`/api/v1`, document.baseURI)


export async function getLocations() {
  const response = await request.get(`${rootURL}/locations`)
  return response.body
}