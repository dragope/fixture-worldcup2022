import React, { useContext, createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'

const AuthContext = createContext([])

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('There is no Auth provider');
    }
        return context
}

function AuthContextProvider({ children }){

    const [ user, setUser ] = useState(null)
    const [ load, setLoad ] = useState(true)

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)

    const login = (email, password) =>  signInWithEmailAndPassword(auth, email, password)

    const logout = () => {
        signOut(auth)
    }
    
    useEffect(()=>{
        const unsuscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser)
        setLoad(false)
        })
        return () => unsuscribe;
    }, [])

    return(
        <AuthContext.Provider value={{
            signup,
            login,
            user,
            logout,
            load
        }}>
            {children}
        </AuthContext.Provider>)
}

export default AuthContextProvider