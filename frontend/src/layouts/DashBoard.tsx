import { Outlet } from 'react-router-dom'
import  SideBar  from '../components/dashboard/SideBar'

const Dashboard = () => {
  return (
    <div className='font-serif'>
      <SideBar />
      <Outlet />
    </div>
  )
}

export default Dashboard