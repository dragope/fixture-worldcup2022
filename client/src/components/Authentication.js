import React, { useEffect, useState } from 'react'
import './Authentication.css'
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'

const Authentication = () => {

    const { user, signup, login } = useAuthContext()
    const navigate = useNavigate()
    const [ registered, setRegistered ] = useState(true)
    const [ error, setError ] = useState(null)

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    }, [user])

    const handleAuthentication = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        if(registered){
            try{
                await login(email, password)
                navigate('/')
            } catch(error){
                setError(error.message)
            }
        } else {
            const confirmpassword = e.target.confirmpassword.value
            if(password === confirmpassword){
                try{
                    await signup(email, password)
                    navigate('/')
                } catch (error){
                    setError(error.message)
                }
            } else {
                setError('Passwords do not match')
            }
        }
    }

    const handleSignOut = () => {
        console.log('sign out')
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