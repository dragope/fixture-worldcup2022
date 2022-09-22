import React from 'react'
import './Result.css'
import { useFixtureContext } from '../context/fixtureContext'

function OpenedResult({ savedResult, goalsLocal, goalsVisitor, setGoalsLocal, setGoalsVisitor, stage, submitResult }) {

    const { openModal } = useFixtureContext()

    const handleClick = () => {
        console.log(stage + goalsLocal + goalsVisitor)
        if(stage !== "group" && goalsLocal === goalsVisitor){
           openModal()
        alert('Matches cannot be a tie')
        } else {
            submitResult()
        }
    }

  return (
    <div className='group-stage-group-match-results'>
        <div className='group-stage-group-match-result-container'>
            <input 
                type="number" 
                placeholder={savedResult[0] ? savedResult[0].goalsLocal : 0}
                value={goalsLocal}
                className='group-stage-group-match-result'
                onChange={ e => setGoalsLocal(e.target.value) }
            />
        </div>
        <button onClick={handleClick} id="set">Set</button>
        <div className='group-stage-group-match-result-container'>
            <input 
                type="number" 
                placeholder={savedResult[0] ? savedResult[0].goalsVisitor : 0}
                value={goalsVisitor}
                className='group-stage-group-match-result'
                onChange={ e => setGoalsVisitor(e.target.value) }
            />
        </div>
    </div>
  )
}

export default OpenedResult