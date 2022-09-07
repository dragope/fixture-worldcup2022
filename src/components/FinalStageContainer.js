import React from 'react'
import Match from './Match'
import './FinalStageContainer.css'

function FinalStageContainer({ stage, countries }) {
  return (
    <div className='final-stage-container'>
        <h1 className='final-stage-title'>{stage.name}</h1>
        {
            stage.matches.map( match => 
            <div className='final-stage-match-container'>
                <p>Match {match.matchid}</p>
                <Match match={match} data={countries}/>
            </div>)
        }
    </div>
  )
}

export default FinalStageContainer