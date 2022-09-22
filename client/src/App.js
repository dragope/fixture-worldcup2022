import React, { useEffect, useState } from 'react';
import './App.css';
import GroupStage from './components/GroupStage';
import FinalStages from './components/FinalStages';
import FixtureContextProvider from './context/fixtureContext';
import Modal from './components/Modal';
import Menu from './components/Menu';
import Authentication from './components/Authentication';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebaseConfig';
import Podium from './components/Podium';

function App() {

    const [ logged, setLogged ] = useState(false)
    const [ load, setLoad ] = useState(true)

    useEffect(()=>{
      onAuthStateChanged(auth, (data)=>{
        if(data){
          setLogged(data)
        }
      })
      setLoad(false)
    }, [])

  return (
    <div className="App">
      {
        load ?
          <h1>Loading...</h1>
          :
          <FixtureContextProvider>
            {logged ?
            <>
              <Menu />
              <Modal />
              <GroupStage />
              <FinalStages />
              <Podium />
            </>
            :
            <Authentication />
            }
          </FixtureContextProvider>
      }
    </div>
  );
}

export default App;