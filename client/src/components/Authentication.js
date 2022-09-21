import React, { useState } from 'react'
import './Authentication.css'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'
import { useFixtureContext } from '../context/fixtureContext';

const Authentication = () => {

    const { user, setUser } = useFixtureContext();
    const [ registered, setRegistered ] = useState(true)
    const [ error, setError ] = useState(null)

    const handleAuthentication = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        if(registered){
            signInWithEmailAndPassword(auth, email, password)
            .then(resp => setUser(resp))
            .catch(err => setError(err))
        } else {
            const confirmpassword = e.target.confirmpassword.value
            if(password === confirmpassword){
                createUserWithEmailAndPassword(auth, email, password)
                .then(data => setUser(data))
                .catch(err => setError(err))
            } else {
                setError('Passwords do not match')
            }
        }
    }

    const handleSignOut = () => {
        signOut(auth)
        .then(()=> setUser(null))
        .catch(err => console.log(err))
    }

  return (
    <div className='authentication-container'>
        
        <h1 className='authentication-title'>{registered ? "Login" : "Sign Up"}</h1>
        <form className='authentication-form' onSubmit={handleAuthentication}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
            {!registered && 
            <>
                <label htmlFor="password">Confirm Password</label>
                <input type="password" id="confirmpassword" />
            </>}
            <button>{registered ? "Log In" : "Sign Up"}</button>
        </form>
        <button className='authentication-state-button' id="second" onClick={()=> setRegistered(!registered)}>{registered ? "Not registered? Create an account here!" : "Already registered? Login here!"}</button>
        <button className='authentication-state-button' onClick={()=> handleSignOut()}>Sign Out</button>
        {error &&
            <p className='authentication-error'>{error}</p>
        }
    </div>
  )
}

export default Authentication