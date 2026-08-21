import { getLatLong } from '../locationHandler.ts'
import { AdvancedMarker, APIProvider, Map, Marker, Pin } from '@vis.gl/react-google-maps'
import { useLocations, useStops } from '../hooks.tsx'
import { useOutletContext } from 'react-router'
import { pageOutletContext } from '../components/App.tsx'
import { useEffect } from 'react'
import Select from 'react-select'

const MapDisplay = () => {
  const {setPage, selectedStop, setSelectedStop} = useOutletContext<pageOutletContext>()
  const {data, isError, isPending, error} = useLocations(selectedStop.stop_id)
  const {data: stopsData, isError: stopsError, isPending: stopsPending, error: stopsErrorObj} = useStops()


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
  
    <div className='flex justify-center'>
 <Select 
 onChange={(e)=> {
        const stop = stops.find((s)=> s.stop_name === e?.value)
        if (stop) setSelectedStop(stop)
      }}
 value={{value:selectedStop.stop_name, label:`${selectedStop.stop_name} - ${selectedStop.stop_code}`}}
 styles = {{
  container: (provided) => ({
    ...provided,
    width: '50%',
    paddingBottom: '1rem',
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: '#ebf5fb',
    color: '#2d7caf',
    fontWeight: 'bold',
  }),
 menu: (provided) => ({
    ...provided,
    color: '#2d7caf',
    fontWeight: 'bold',
    backgroundColor: '#ebf5fb',
  }), 
 }} options = {stops.map((s) => ({ value: s.stop_name, label: `${s.stop_name} - ${s.stop_code}` }))} />
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
