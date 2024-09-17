import { Outlet } from 'react-router-dom'
import  Footer  from '../components/common/Footer'
import Header from '@/components/common/Header'

const Main = () => {
  return (
    <div className='font-serif'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Main