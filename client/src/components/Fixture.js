import React, { useEffect } from 'react'
import GroupStage from './GroupStage';
import FinalStages from './FinalStages';
import Modal from './Modal';
import Menu from './Menu';
import Podium from './Podium';
import PodiumModal from './PodiumModal'
import { useAuthContext } from '../context/AuthContext';
import { useFixtureContext } from '../context/fixtureContext';

function Fixture() {

  const { load } = useAuthContext()
  const { getMatchesPlayed } = useFixtureContext();

  useEffect(()=>{
    getMatchesPlayed()
  }, [])

  return (
    <div className='home-container'>
        { load ?
          <h1>Loading...</h1>
          :
          <>
            <Menu />
            <PodiumModal />
            <Modal />
            <GroupStage />
            <FinalStages />
            <Podium />
          </>
        }
    </div>
  )
}

export default Fixture