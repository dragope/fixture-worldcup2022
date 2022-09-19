import React from 'react'
import './Result.css'

function OpenedResult({ savedResult, goalsLocal, goalsVisitor, setGoalsLocal, setGoalsVisitor, stage, submitResult, setModal, submited }) {

    const handleClick = () => {
        if(stage !== "group" && goalsLocal === goalsVisitor){
           setModal(true)
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