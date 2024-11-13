import { Outlet } from 'react-router-dom'
import './App.css'
import ResponsiveNavbar from './components/ResponsiveNavbar'

function App() {
  return (
    <>
      <ResponsiveNavbar />
      <Outlet />
    </>
  )
}

export default App
