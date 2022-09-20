import React, { useEffect } from 'react'
import Match from './Match'
import './FinalStageContainer.css'
import { useFixtureContext } from '../context/fixtureContext'

function FinalStageContainer({ stage, countries }) {

  const { round16, quarterfinals, semifinals, thirdPlace, final, getFinalStages, getMatchesPlayed } = useFixtureContext()

  useEffect(()=>{}, [round16, quarterfinals, semifinals, thirdPlace, final])

  const clearStage = () => {
    if(stage.name === "Round of 16"){
      fetch('/api/clear-round16', { method: "DELETE" })
        .then(res => res.status === 200 && getFinalStages())
        .then(()=> getMatchesPlayed())
        .catch(err => console.error(err))
    }
    if(stage.name === "Quarterfinals"){
      fetch('/api/clear-quarterfinals', { method: "DELETE" })
        .then(res => res.status === 200 && getFinalStages())
        .then(()=> getMatchesPlayed())
        .catch(err => console.error(err))
    }
    if(stage.name === "Semifinals"){
      fetch('/api/clear-semifinals', { method: "DELETE" })
        .then(res => res.status === 200 && getFinalStages())
        .then(()=> getMatchesPlayed())
        .catch(err => console.error(err))
    }
    if(stage.name === "Third Place"){
      fetch('/api/clear-third-place', { method: "DELETE" })
        .then(res => res.status === 200 && getFinalStages())
        .then(()=> getMatchesPlayed())
        .catch(err => console.error(err))
    }
    if(stage.name === "Final"){
      fetch('/api/clear-final', { method: "DELETE" })
        .then(res => res.status === 200 && getFinalStages())
        .then(()=> getMatchesPlayed())
        .catch(err => console.error(err))
    }
  }

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
        <div className='final-stage-container-button-container'><button onClick={clearStage}>Clear {stage.name}</button></div>
    </div>
  ) 
}

export default FinalStageContainer