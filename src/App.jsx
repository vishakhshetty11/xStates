import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import CitySelector from './Pages/CitySelector'

const router = createBrowserRouter([
  {
    path:"/",
    element:<CitySelector/>,
  }
])



export default router
