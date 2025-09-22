import React from 'react'
import { Outlet } from 'react-router-dom'

function studentPanel() {
  return (
   <div>
   <Outlet/>
   </div>
  )
}

export default studentPanel
