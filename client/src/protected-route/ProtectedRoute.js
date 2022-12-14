 import React, { useEffect } from 'react'
 import { useAuthContext } from '../context/AuthContext'
 import { Navigate } from 'react-router-dom'
 
 function ProtectedRoute({children}) {

    const { user, loading } = useAuthContext();

    if(loading){
        return <h1>Loading...</h1>
    }

    if(!user){
       return <Navigate to='/authentication' />
    }

   return <>{children}</>
 }
 
 export default ProtectedRoute