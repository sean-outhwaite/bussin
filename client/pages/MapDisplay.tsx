import { getLatLong } from '../locationHandler.ts'
import { AdvancedMarker, APIProvider, Map, Marker, Pin } from '@vis.gl/react-google-maps'
import { useLocations, useStops } from '../hooks.tsx'
import { useOutletContext } from 'react-router'
import { pageOutletContext } from '../components/App.tsx'
import { useEffect, useState } from 'react'

const MapDisplay = () => {
  const [selectedStop, setSelectedStop] = useState<{stop_name: string, stop_lat: number, stop_lon: number, stop_id: string}> ({stop_name:'Symonds St', stop_lat:-36.86226, stop_lon: 174.760945, stop_id: '7151-93995941'})
  const {data, isError, isPending, error} = useLocations(selectedStop.stop_id)
  const {data: stopsData, isError: stopsError, isPending: stopsPending, error: stopsErrorObj} = useStops()
  const {setPage} = useOutletContext<pageOutletContext>()


  useEffect(()=>{
      setPage('home')
    },[setPage])

  if (isPending || stopsPending) return <div className='flex justify-center'><img src='/giphy.gif' alt='moving bus'/> </div>

  if (isError || stopsError) {
    console.log(error || stopsErrorObj)
    return <p>There was an error</p>
  }

  const latLongs = getLatLong(data)

  const occupancyColours = {
    0: '#ffffff',
    1: '#44ce1b',
    2: '#bbdb44',
    3: '#f7e379',
    4: '#f2a134',
    5: '#e51f1f',
    6: 'FF0000'
  }

  const stops = stopsData ? stopsData.map((s)=> s.attributes) : []

  return (
    <>
    <div className='flex justify-start'>
      <select
      value={selectedStop.stop_name}
      onInput={(e)=> {
        const stop = stops.find((s)=> s.stop_name === (e.target as HTMLSelectElement).value)
        if (stop) setSelectedStop(stop)
      }}>
        <option value=''>Select a stop</option>
        {stops.map((s,idx)=>(
          <option key={s.stop_name + idx} value={s.stop_name}>{s.stop_name}</option>
        ))}
      </select>
    </div>
    <div className='flex justify-center'>
      {latLongs && (
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
            <Map
              style={{ width: '80vw', height: '50vh' }}
              center={{ lat: selectedStop.stop_lat, lng: selectedStop.stop_lon }}
              defaultZoom={15}
              gestureHandling="greedy"
              mapId='f570965d1003d0c912a3687f'
              disableDefaultUI
              colorScheme={'FOLLOW_SYSTEM'}
            >
              {latLongs?.map((l,idx) => (
                <Marker key={l.key + idx} icon={'/bus.png'} label={{text:l.key.slice(0,l.key.indexOf('-')), color:`${occupancyColours[l.occ]}`, fontSize:'medium'}} position={l.location} />
              ))}
              <AdvancedMarker key='stop'  position={{lat:selectedStop.stop_lat, lng: selectedStop.stop_lon}} >
              <Pin  background={'#B816F0'}  glyphColor={'#000'} borderColor={'#000'} />
              </AdvancedMarker>
            </Map>
          </APIProvider>
        )}
    </div>
    </>
  )
}

export default MapDisplay
