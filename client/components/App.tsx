import { Link, Outlet } from 'react-router'

function App() {
  return (
    <div className='h-100 w-100 min-h-screen bg-white dark:bg-gray-800 px-6 py-8 ring shadow-xl ring-gray-900/5' >
      <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-[#2c384c] md:text-5xl lg:text-6xl dark:text-white'>Bussin</h1>
      <nav className='bg-[#ebf5fb] border-y border-default max-w-screen-xl px-4 py-3 mx-auto  flex flex-row font-extrabold mt-0 space-x-8 rtl:space-x-reverse text-lg text-[#2d7caf]'> <Link className='hover:underline' to='/'>Map</Link> <Link className='hover:underline' to='/board'>Board</Link></nav>
      <h2 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-[#2c384c] md:text-5xl lg:text-2xl dark:text-white'>Check out all of the busses on their way to this one specific stop:</h2>
      <Outlet />
    </div>
  )
}

export default App