import { getLatLong } from '../locationHandler.ts'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { useLocations } from '../hooks.tsx'

const Home = () => {
  const {data, isError, isPending, error} = useLocations()

  if (isPending) return <img src='/giphy.gif' alt='moving bus'/>

  if (isError) {
    console.log(error)
    return <p>There was an error</p>
  }
  const latLongs = getLatLong(data.data)
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
