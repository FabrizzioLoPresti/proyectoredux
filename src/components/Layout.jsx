import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <>
      <Header />
      <div className="container mt-5">
        <Outlet />
      </div>
    </>
  )
}

export default Layout