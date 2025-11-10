import { useState, useEffect } from 'react'
import {  getLocations } from '../apiClient.ts'
import { useQuery } from '@tanstack/react-query'
import { LocationData, Poi } from '../../models/location.ts'
import { getLatLong } from '../locationHandler.ts'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'

const Home = () => {
  // const [locationData, setLocationData] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [latLongs, setLatLongs] = useState<Poi[] | null>(null)


    const handleGetLocations = async () => {
    setLoading('random')
    setError(null)
    try {
      const data = await getLocations()
      setLatLongs(getLatLong(data.data))
      // setLocationData(data)
    } catch (err) {
      setError('Failed to fetch random affirmation')
      console.error(err)
    }
    setLoading(null)
  }

  useEffect( ()=>{
    handleGetLocations()
  },[])

  if (loading) return <img src='/giphy.gif' alt='moving bus'/>

  if (error) {
    return <p>There was an error</p>
  }

  return (
    <>
      {latLongs && (
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
            <Map
              style={{ width: '80vw', height: '50vh' }}
              defaultCenter={{ lat: -36.86226, lng: 174.760945 }}
              defaultZoom={15}
              gestureHandling="greedy"
              disableDefaultUI
            >
              {latLongs?.map((l,idx) => (
                <Marker key={l.key + idx} label={l.key} position={l.location} />
              ))}
            </Map>
          </APIProvider>
        )}
    </>
  )
}

export default Home
