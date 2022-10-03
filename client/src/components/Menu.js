import React, { useEffect } from 'react'
import './Menu.css'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import WorldCupLogo from '../images/WorldCupLogo.svg'

function Menu() {

    const { user, logout } = useAuthContext()
    const navigate = useNavigate();

    const handleSignOut = async () => {
      await logout()
      navigate('/authentication')
    }

  return (
    <div className='menu-container'>
        <img src={WorldCupLogo} className="menu-logo"/>
        <h1>Fixture</h1>
        <div className='menu-container-user'>
            <p><b>{user.email}</b></p>
            <button className='menu-container-logout-button' onClick={()=> handleSignOut()}>Sign Out</button>
        </div>
    </div>
  )
}

export default Menu