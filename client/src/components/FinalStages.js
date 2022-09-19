import React, { useEffect } from 'react'
import FinalStageContainer from './FinalStageContainer'
import data from '../data/data'
import { useFixtureContext } from '../context/fixtureContext'

function FinalStages() {

  const { getFinalStages } = useFixtureContext()

  useEffect(()=>{
      getFinalStages()
  }, [])

  return (
    <div className='final-stages'>

        {
            data.finalstages.map( stage => <FinalStageContainer key={stage.name} stage={stage} countries={data.countries}/>)
        }
    </div>
  )
}

export default FinalStages