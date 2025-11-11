import { Outlet } from 'react-router'

function App() {
  return (
    <div className='h-screen w-screen overflow-hidden bg-white dark:bg-gray-800 px-6 py-8 ring shadow-xl ring-gray-900/5' >
      <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Bussin</h1>
      <h2 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>Check out all of the busses on their way to this one specific stop:</h2>
      <Outlet />
    </div>
  )
}

export default App