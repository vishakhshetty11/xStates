import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
  }
])



export default router
