import React from 'react'
import './Menu.css'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import WorldCupLogo from '../images/WorldCupLogo.svg'
import UserDefaultPic from '../images/user-default-pic.jpeg'

function Menu() {

    const { user, logout } = useAuthContext()
    const navigate = useNavigate();

    const handleSignOut = async () => {
      await logout()
      navigate('/authentication')
    }

  return (
    <div className='menu-container'>
        <div className='logo-container'>
        <Link to='/'><img src={WorldCupLogo} className="menu-logo"/></Link>
        </div>
        <h1>Fixture</h1>
        <div className='menu-container-user'>
          <div className="menu-container-user-profile">
          <Link to='/profile'><p><b className='menu-user'>Welcome, { user.displayName ? user.displayName : user.email }</b></p></Link>
          </div>
          <button className='menu-container-logout-button' onClick={()=> handleSignOut()}>Sign Out</button>
          <Link to='/profile'><img className="menu-user-profile-pic" src={user.photoURL ? user.photoURL : UserDefaultPic} alt="User" /></Link>
        </div>
    </div>
  )
}

export default Menu