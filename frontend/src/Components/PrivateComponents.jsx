import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const PrivateComponents = () => {
    const auth = localStorage.getItem("userdata")
    return auth ? < Outlet /> : <Navigate to="/login" />

}

export default PrivateComponents
