import { Outlet } from 'react-router-dom'
import Header from '@/components/common/Header'

const Dashboard = () => {
  return (
    <div className='font-serif'>
      <Header />
      <Outlet />
    </div>
  )
}

export default Dashboard