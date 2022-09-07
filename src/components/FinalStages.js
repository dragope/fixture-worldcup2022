import React from 'react'
import FinalStageContainer from './FinalStageContainer'
import data from '../data/data'

function FinalStages() {
  return (
    <div className='final-stages'>
        {
            data.finalstages.map( stage => <FinalStageContainer id={stage.name} stage={stage} countries={data.countries}/> )
        }
    </div>
  )
}

export default FinalStages