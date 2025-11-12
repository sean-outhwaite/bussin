import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router'

import App from './components/App'
import Home from './components/Home'
import ArrivalBoard from './components/ArrivalBoard'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path='/board' element={<ArrivalBoard/>}/>
  </Route>
)

const router = createBrowserRouter(routes)

export default router