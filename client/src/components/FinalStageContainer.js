import React, { useEffect } from 'react'
import Match from './Match'
import './FinalStageContainer.css'
import { useFixtureContext } from '../context/fixtureContext'

function FinalStageContainer({ stage, countries }) {

  const { round16, quarterfinals, semifinals, thirdPlace, final } = useFixtureContext()

  useEffect(()=>{}, [round16, quarterfinals, semifinals, thirdPlace, final])

  return (
    <div className='final-stage-container' >
        <h1 className='final-stage-title'>{stage.name}</h1>
        {
            stage.matches.map( match => 
              <div className='final-stage-match-container'>
                <p>Match {match.matchid}</p>
                <Match key={match.matchid} match={match} countries={countries} round={ stage.name === "Round of 16" ? round16 : stage.name === "Quarterfinals" ? quarterfinals : stage.name === "Semifinals" ? semifinals : stage.name === "Third Place" ? thirdPlace : stage.name === "Final" && final }/>
              </div>)
        }
    </div>
  ) 
}

export default FinalStageContainer