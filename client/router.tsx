import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router'

import App from './components/App'
import MapDisplay from './pages/MapDisplay'
import ArrivalBoard from './pages/ArrivalBoard'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<MapDisplay />} />
    <Route path='/board' element={<ArrivalBoard/>}/>
  </Route>
)

const router = createBrowserRouter(routes)

export default router