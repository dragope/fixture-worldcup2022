import React from 'react'
import './Result.css'

function SetResult({ savedResult, goalsLocal, goalsVisitor, setSubmited }) {
  return (
    <div className='group-stage-group-match-results'>
        <div className='group-stage-group-match-result-container'>
            <p>
                {savedResult[0] ? savedResult[0].goalsLocal : goalsLocal ? goalsLocal : 0}
            </p>
        </div>
        <button onClick={()=> setSubmited(false)}>Edit</button>
        <div className='group-stage-group-match-result-container'>
            <p>
                {savedResult[0] ? savedResult[0].goalsVisitor : goalsVisitor ? goalsVisitor : 0}
            </p>
        </div>
    </div>
  )
}

export default SetResult