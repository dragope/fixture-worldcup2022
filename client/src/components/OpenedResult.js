import React from 'react'
import './Result.css'
import { useFixtureContext } from '../context/fixtureContext'

function OpenedResult({ savedResult, goalsLocal, goalsVisitor, setGoalsLocal, setGoalsVisitor, stage, submitResult }) {

    const { openModal, setModalMessage } = useFixtureContext()

    const handleClick = () => {
        if( stage !== "group" && Number(goalsLocal) === Number(goalsVisitor)){
            setModalMessage(<div><p><b>Final Stage matches cannot end in a tie</b></p> 
                <p>If you think they are going to do so in the 90', plase add to the final score you predicted the result of the penalty shootout.</p>
                <p><i>For example: if you think the match is going to end in the 90' 1 - 1 and the penalty shootout 4 -3, write 5 - 4 as the final result.</i></p></div>)
           openModal()
        } else {
            if(goalsLocal >= 0 && goalsVisitor >= 0 ){
                submitResult() 
            }else{
                setModalMessage(<p>Results <b>cannot</b> contain any <i>negative</i> numbers or <i>non-integrer</i> numbers</p>)
                openModal()
        }
        }
    }

  return (
    <div className='group-stage-group-match-results'>
        <div className='group-stage-group-match-result-container'>
            <input 
                type="number" 
                // placeholder={savedResult[0] ? savedResult[0].goalsLocal : 0}
                // value={goalsLocal}
                className='group-stage-group-match-result'
                onChange={ e => setGoalsLocal(e.target.value) }
            />
        </div>
        <button onClick={handleClick} id="set">Set</button>
        <div className='group-stage-group-match-result-container'>
            <input 
                type="number" 
                // placeholder={savedResult[0] ? savedResult[0].goalsVisitor : 0}
                // value={goalsVisitor}
                className='group-stage-group-match-result'
                onChange={ e => setGoalsVisitor(e.target.value) }
            />
        </div>
    </div>
  )
}

export default OpenedResult