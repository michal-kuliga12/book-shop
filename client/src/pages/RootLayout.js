import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
      <Navbar />
        <main>
          <Outlet />
        </main>
      <Footer />
    </div>
  )
}

export default RootLayout