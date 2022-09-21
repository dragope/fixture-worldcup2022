import React from 'react'
import './Menu.css'
import { auth } from '../firebase/firebaseConfig'
import { signOut } from 'firebase/auth'

function Menu({ user, setUser }) {

    const handleSignOut = () => {
    signOut(auth)
    .then(()=> setUser(null))
    .catch(err => console.log(err))
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