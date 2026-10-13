import { NavLink, Outlet } from 'react-router'
import { Dispatch, SetStateAction, useState } from 'react'
import { SelectedStop } from '../../models/stop'

export interface pageOutletContext {
  selectedStop: SelectedStop
  setSelectedStop: Dispatch<SetStateAction<SelectedStop>>
}

function App() {
  const [selectedStop, setSelectedStop] = useState<SelectedStop>({
    stop_name: 'Symonds St',
    stop_lat: -36.86226,
    stop_lon: 174.760945,
    stop_id: '7151-93995941',
    stop_code: '7151',
  })

  return (
    <div className="h-100 w-100 min-h-screen bg-white px-6 py-8 shadow-xl ring ring-gray-900/5 dark:bg-gray-800">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-[#2c384c] md:text-5xl lg:text-6xl dark:text-white">
        Bussin
      </h1>
      <nav className="mx-auto mb-2 mt-0 flex flex-row space-x-8 rounded-lg bg-[#ebf5fb] px-4 py-3 text-lg font-extrabold text-[#2d7caf] rtl:space-x-reverse">
        {' '}
        <NavLink
          className={({ isActive }) =>
            `hover:underline ${isActive ? 'text-[#cb0076] underline decoration-2' : ''}`
          }
          to="/"
        >
          Map
        </NavLink>{' '}
        <NavLink
          className={({ isActive }) =>
            `hover:underline ${isActive ? 'text-[#cb0076] underline decoration-2' : ''}`
          }
          to="/board"
        >
          Board
        </NavLink>
      </nav>
      <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-[#2c384c] md:text-5xl lg:text-2xl dark:text-white">
        Check out all of the busses on their way to this one specific stop:
      </h2>
      <Outlet
        context={{ selectedStop, setSelectedStop } satisfies pageOutletContext}
      />
    </div>
  )
}

export default App
