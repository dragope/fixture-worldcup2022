import React, { useEffect } from 'react'
import './Menu.css'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Menu() {

    const { user, logout } = useAuthContext()
    const navigate = useNavigate();

    const handleSignOut = async () => {
      await logout()
      navigate('/authentication')
    }

  return (
    <div className='menu-container'>
        <h1>Fixture Qatar 2022</h1>
        <div className='menu-container-user'>
            <p><b>{user.email}</b></p>
            <button className='menu-container-logout-button' onClick={()=> handleSignOut()}>Sign Out</button>
        </div>
    </div>
  )
}

export default Menu