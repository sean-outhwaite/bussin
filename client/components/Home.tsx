import { getLatLong } from '../locationHandler.ts'
import { AdvancedMarker, APIProvider, Map, Marker, Pin } from '@vis.gl/react-google-maps'
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
              mapId='busMap'
              disableDefaultUI
            >
              {latLongs?.map((l,idx) => (
                <Marker  key={l.key + idx} icon={'/bus.png'} label={{text:l.key.slice(0,3), color:'#ffffff'}} position={l.location} />
              ))}
              <AdvancedMarker key='stop'  position={{lat:-36.86226, lng: 174.760945}} >
              <Pin  background={'#B816F0'}  glyphColor={'#000'} borderColor={'#000'} />

              </AdvancedMarker>
            </Map>
          </APIProvider>
        )}
    </>
  )
}

export default Home
