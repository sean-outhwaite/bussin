import { Outlet } from 'react-router'

function App() {
  return (
    <div>
      <h1 className=''>App Header</h1>
      <Outlet />
    </div>
  )
}

export default App