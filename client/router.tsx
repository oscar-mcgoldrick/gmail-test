import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import App from './components/App'
import AuthLanding from './components/AuthLanding'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='/auth' element={<AuthLanding />} />
      <Route path='/auth:authCode' element={<AuthLanding2 />} />
    </Route>
  )
)

export default router