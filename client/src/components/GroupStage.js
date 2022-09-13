import React, { useEffect } from 'react'
import './GroupStage.css'
import Group from './Group'
import data from '../data/data'
import { useFixtureContext } from '../context/fixtureContext'

function GroupStage() {

  const { getMatchesPlayed, load } = useFixtureContext()

  useEffect(()=>{
    getMatchesPlayed()
  }, [])

  return (
    <>
    { load ?
      <h1 className='group-stage-title'>Loading...</h1>
      :
      <div className='group-stage'>
        <h1 className='group-stage-title'>Group Stage</h1>
          {
              data.groups.map( group => <Group id={group.group} group={group} countries={data.countries}/>)
          }
      </div>
    }

    </>
  )
}

export default GroupStage