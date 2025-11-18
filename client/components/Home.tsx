import { getLatLong } from '../locationHandler.ts'
import { AdvancedMarker, APIProvider, Map, Marker, Pin } from '@vis.gl/react-google-maps'
import { useLocations } from '../hooks.tsx'
import { useOutletContext } from 'react-router'
import { pageOutletContext } from './App.tsx'

const Home = () => {
  const {data, isError, isPending, error} = useLocations()
   const {setPage} = useOutletContext<pageOutletContext>()
  setPage('home')

  if (isPending) return <img src='/giphy.gif' alt='moving bus'/>

  if (isError) {
    console.log(error)
    return <p>There was an error</p>
  }

  const latLongs = getLatLong(data)

  const occupancy = {
    0: '#ffffff',
    1: '#44ce1b',
    2: '#bbdb44',
    3: '#f7e379',
    4: '#f2a134',
    5: '#e51f1f',
    6: 'FF0000'
  }

  return (
    <div className='flex justify-center'>
      {latLongs && (
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
            <Map
              style={{ width: '80vw', height: '50vh' }}
              defaultCenter={{ lat: -36.86226, lng: 174.760945 }}
              defaultZoom={15}
              gestureHandling="greedy"
              mapId='f570965d1003d0c912a3687f'
              disableDefaultUI
              colorScheme={'FOLLOW_SYSTEM'}
            >
              {latLongs?.map((l,idx) => (
                <Marker key={l.key + idx} icon={'/bus.png'} label={{text:l.key.slice(0,l.key.indexOf('-')), color:`${occupancy[l.occ]}`, fontSize:'medium'}} position={l.location} />
              ))}
              <AdvancedMarker key='stop'  position={{lat:-36.86226, lng: 174.760945}} >
              <Pin  background={'#B816F0'}  glyphColor={'#000'} borderColor={'#000'} />
              </AdvancedMarker>
            </Map>
          </APIProvider>
        )}
    </div>
  )
}

export default Home
