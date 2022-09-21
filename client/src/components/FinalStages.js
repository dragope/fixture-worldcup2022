import React, { useEffect } from 'react'
import FinalStageContainer from './FinalStageContainer'
import data from '../data/data'
import { useFixtureContext } from '../context/fixtureContext'

function FinalStages({ user }) {

  const { getFinalStages, loadFinalStages } = useFixtureContext()

  useEffect(()=>{
      getFinalStages()
  }, [])

  return (
    <div className='final-stages'>
        {loadFinalStages ?
            <h1 className='group-stage-title'>Loading...</h1>
            :
            data.finalstages.map( stage => <FinalStageContainer key={stage.name} stage={stage} countries={data.countries} user={user} />)
        }
    </div>
  )
}

export default FinalStages