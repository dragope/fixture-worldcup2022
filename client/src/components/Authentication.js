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

    const handleChangeFunction = () => {
        setRegistered(!registered) 
        setError(null)
    }

    const handleAuthentication = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        if(registered){
            try{
                await login(email, password)
                navigate('/')
            } catch(error){
                error.message === "Firebase: Error (auth/user-not-found)." && setError('User not found. Please try again or register.')
                error.message === "Firebase: Error (auth/wrong-password)." && setError('The password you entered is invaid. Try again, please.')
            }
        } else {
            const confirmpassword = e.target.confirmpassword.value
            if(password === confirmpassword){
                try{
                    await signup(email, password)
                    navigate('/')
                } catch (error){
                    error.message === "Firebase: Error (auth/email-already-in-use)." && setError("Email already in use. Choose another or login.")
                    error.message === "Firebase: Error (auth/invalid-email)." && setError('The email used is invalid, please check it and try again.')
                }
            } else {
                setError('Passwords do not match')
            }
        }
    }

  return (
    <div className='authentication-container'>
        
        <h1 className='authentication-title'>{registered ? "Login" : "Sign Up"}</h1>
        <form className='authentication-form' onSubmit={handleAuthentication}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="you@domain.com" autoComplete='username'/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder='Password' autoComplete='current-password' />
            {!registered && 
            <>
                <label htmlFor="password">Confirm Password</label>
                <input type="password" id="confirmpassword" />
            </>}
            <button>{registered ? "Log In" : "Sign Up"}</button>
        </form>
        <button className='authentication-state-button' id="second" onClick={handleChangeFunction}>{registered ? "Not registered? Create an account here!" : "Already registered? Login here!"}</button>
        {error &&
            <p className='authentication-error'>{error}</p>
        }
    </div>
  )
}

export default Authentication