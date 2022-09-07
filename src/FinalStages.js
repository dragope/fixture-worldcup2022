import React from 'react'
import FinalStageContainer from './components/FinalStageContainer'
import data from './data/data'

function FinalStages() {
  return (
    <div className='final-stages'>
        {
            data.finalstages.map( stage => <FinalStageContainer stage={stage} countries={data.countries}/> )
        }
    </div>
  )
}

export default FinalStages