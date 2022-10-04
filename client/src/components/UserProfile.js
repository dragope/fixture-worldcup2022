import React, { useState } from 'react'
import './UserProfile.css'
import { useAuthContext } from '../context/AuthContext'
import { updatePassword, updateEmail, updateProfile, updateUser } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase/firebaseConfig';

function UserProfile() {
    
    const { user, setUser } = useAuthContext()
    const [ operationStatus, setOperationStatus ] = useState("")
    const [ userName, setUserName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ emailConfirm, setEmailConfirm ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ passwordConfirm, setPasswordConfirm ] = useState("")
    const [ profilePic, setProfilePic ] = useState()

    console.log(user)

    const emailUpdate = async () => {
        setOperationStatus('Please wait, we are processing the changes...')
        if(email === emailConfirm && email.length > 5 && email.includes('@')){
            try{
                await updateEmail(auth.currentUser, email)
                setOperationStatus('Your email was updated successfully')
            } catch(error){
                setOperationStatus(`There was an error updating your email, please try again. Error: ${error}`)
            }
        } else {
            setOperationStatus('Please insert a valid email')
        }
    }

    const passwordUpdate = async () => {
        setOperationStatus('Please wait, we are processing the changes...')
        if(password === passwordConfirm){
            try{
                await updatePassword(auth.currentUser, password)
                setOperationStatus('Your password was updated successfully')
            } catch(error){
                setOperationStatus(`There was an error updating your password, please try again. Error: ${error}`)
            }
        } else {
            setOperationStatus('Passwords must match')
        }
    }

    const profileUpdate = async() => {
        setOperationStatus('Please wait, we are processing the changes...')
        const updatedUser = {}
        if(userName.length > 1){
                updatedUser.displayName = userName;
            } else {
                updatedUser.displayName = user.displayName
            }if(email.length > 1 && email !== emailConfirm){
                return setOperationStatus('Emails must match')
            }
            if(profilePic != null){
                const date = Date.now()
                const imageRef = ref(storage, `/profile-pics/${user.email}+${profilePic.name}+${date}`)
                try{
                    await uploadBytes(imageRef, profilePic)
                    const url = await getDownloadURL(imageRef)
                    updatedUser.photoURL = url
                    await updateProfile(auth.currentUser, updatedUser)
                    setOperationStatus("Your profile has been succesfully updated! You should see the changes effective in a short bit")
                    setUser(auth.currentUser)
                } catch(err){
                    return setOperationStatus(`${err}`)
                }
            } else {
                await updateProfile(auth.currentUser, updatedUser)
                setOperationStatus("Your profile has been succesfully updated! You should see the changes effective in a short bit")
                setUser(auth.currentUser)
            }
        
    }

  return (
    <div className='user-profile-container'>
        <h1>Update your profile</h1>
        <div className='user-profile-update-form'>
            <div className='user-profile-section'>
                <p>User Name</p>
                <input className="input-userporfile" type="text" onChange={e => setUserName(e.target.value)} placeholder={ user.displayName ? user.displayName : 'User Name' } />
                <p>Profile Picture</p>
                <input className="pic-upload" type="file"onChange={e => setProfilePic(e.target.files[0])} id="img" name="img" />
                <button onClick={profileUpdate}>Update Profile</button>
            </div>
            <div className='user-profile-section'>
                <p>Email</p>
                <input className="input-userporfile" type="email" onChange={e => setEmail(e.target.value)} placeholder={ user.email } />
                <p>Confirm Email</p>
                <input className="input-userporfile" type="email" onChange={e => setEmailConfirm(e.target.value)} placeholder={ user.email } />
                <button onClick={emailUpdate}>Update Email</button>
            </div>
            <div className='user-profile-section'>
                <p>Password</p>
                <input className="input-userporfile" type="password" onChange={e => setPassword(e.target.value)} placeholder='Password' />
                <p>Confirm Password</p>
                <input className="input-userporfile" type="password" onChange={e => setPasswordConfirm(e.target.value)} placeholder='Confirm Password' />
                <button onClick={passwordUpdate}>Update Password</button>
            </div>
            { operationStatus && <p className='user-profile-error'>{ operationStatus }</p> }
        </div>
    </div>
  )
}

export default UserProfile