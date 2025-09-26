import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../studentPanel component/home/Footer'

function studentPanel() {
  return (
   <div>
    
   <Outlet/>
   
  <Footer/>
   </div>
  )
}

export default studentPanel
