import { Link, Outlet } from 'react-router'
import { Dispatch, SetStateAction, useState } from 'react'
import { SelectedStop } from '../../models/stop'

export interface pageOutletContext {
  setPage: Dispatch<SetStateAction<string>>
  selectedStop: SelectedStop
  setSelectedStop: Dispatch<SetStateAction<SelectedStop>>
}

function App() {
const [page, setPage] = useState('home')
const [selectedStop, setSelectedStop] = useState<SelectedStop>({stop_name:'Symonds St', stop_lat:-36.86226, stop_lon: 174.760945, stop_id: '7151-93995941'})


  return (
    <div className='h-100 w-100 min-h-screen bg-white dark:bg-gray-800 px-6 py-8 ring shadow-xl ring-gray-900/5' >
      <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-[#2c384c] md:text-5xl lg:text-6xl dark:text-white'>Bussin</h1>
      <nav className='bg-[#ebf5fb] px-4 py-3 rounded-lg mx-auto flex flex-row font-extrabold mt-0 mb-2 space-x-8 rtl:space-x-reverse text-lg text-[#2d7caf]'> <Link className={`hover:underline ${page === 'home' ? 'text-[#cb0076] underline decoration-2' : 'text-[#2d7caf]'}`} to='/'>Map</Link> <Link className={`hover:underline ${page === 'board' ? 'text-[#cb0076] underline decoration-2' : 'text-[#2d7caf]'}`} to='/board' >Board</Link></nav>
      <h2 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-[#2c384c] md:text-5xl lg:text-2xl dark:text-white'>Check out all of the busses on their way to this one specific stop:</h2>
      <Outlet context={{setPage, selectedStop, setSelectedStop} satisfies pageOutletContext}  />
    </div>
  )
}

export default App