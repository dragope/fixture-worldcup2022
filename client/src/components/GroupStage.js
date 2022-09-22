import React, { useEffect } from 'react'
import './GroupStage.css'
import Group from './Group'
import data from '../data/data'
import { useFixtureContext } from '../context/fixtureContext'

function GroupStage() {

  const { getMatchesPlayed, loadGroupStage, setLoadGoupStage, getFinalStages, getGroupStages, user, setPodium } = useFixtureContext()

  useEffect(()=>{
    getMatchesPlayed()
  }, [])

  const clearGroupStage = () => {
    fetch(`/api/clear-group-stage/${user.uid}`, { method: "DELETE" })
      .then((res) => {if(res.status === 200){
        getGroupStages()
        getFinalStages()
      }})
      .then(()=> getMatchesPlayed())
      .then(setLoadGoupStage(false))
      .then(setPodium([]))
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