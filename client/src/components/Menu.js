import React, { useEffect } from 'react'
import './Menu.css'
import { auth } from '../firebase/firebaseConfig'
import { signOut } from 'firebase/auth'
import { useFixtureContext } from '../context/fixtureContext' //Eliminar cuando solucionemos lo del usuario

function Menu({ userLogged }) {

    const { setUser, user } = useFixtureContext();

    //Eliminar cuando solucionemos lo del usuario
    useEffect(()=>{
      setUser(userLogged)
    }, [])
    //Eliminar cuando solucionemos lo del usuario

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