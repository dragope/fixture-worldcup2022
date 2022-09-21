import React, { useEffect, useState } from 'react';
import './App.css';
import GroupStage from './components/GroupStage';
import FinalStages from './components/FinalStages';
import FixtureContextProvider from './context/fixtureContext';
import Modal from './components/Modal';
import Authentication from './components/Authentication';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebaseConfig';

function App() {

    const [ user, setUser ] = useState({})

    useEffect(()=>{
      onAuthStateChanged(auth, (data)=>{
        if(data){
          setUser(data)
        }
      })
    }, [])

  return (
    <div className="App">
      <FixtureContextProvider>
        {user ?
        <>
          <Modal user={user}/>
          <GroupStage user={user} setUser={setUser}/>
          <FinalStages user={user}/>
        </>
        :
        <Authentication />
        }
      </FixtureContextProvider>
    </div>
  );
}

export default App;