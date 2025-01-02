import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const AdminRoutes = () => {
  //get user information
  const user = JSON.parse(localStorage.getItem('user'))
  
  //check user and  is admin
  return user != null && user.isAdmin? <Outlet/>
    :<Navigate to ={'/login'}/>

}

export default AdminRoutes
