import React, { useEffect, useState } from 'react'
import './GroupStage.css'
import Group from './Group'
import data from '../data/data'
import { useFixtureContext } from '../context/fixtureContext'
import { useAuthContext } from '../context/AuthContext'

function GroupStage() {

  const { getMatchesPlayed, loadGroupStage, getFinalStages, matchesPlayed } = useFixtureContext()
  const { user } = useAuthContext()
  const [ load, setLoad ] = useState(false)

  useEffect(()=>{
    getMatchesPlayed()
  }, [])

  const clearGroupStage = () => {
    console.log(load)
    fetch(`${process.env.REACT_APP_BACK_URL}/api/clear-group-stage/${user.uid}`, { method: "DELETE" })
      .then((res) => {if(res.status === 200){
        getMatchesPlayed()
        getFinalStages()
      }})
      .then(setLoad(!load))
      .catch(err => console.error(err))
  }

  return (
    <div className="group-stage-container">
    { loadGroupStage ?
      <h1 className='group-stage-title'>Loading...</h1>
      :
      <div className='group-stage'>
        <h1 className='group-stage-title'>Group Stage</h1>
          {
              data.groups.map( group => <Group key={group.group} group={group} user={user} countries={data.countries}/>)
          }
          <div className='group-stage-button-container'><button onClick={clearGroupStage}>Clear Group Stage</button></div>
      </div>
    }

    </div>
  )
}

export default GroupStage