import React from 'react'
import './Modal.css'
import { useFixtureContext } from '../context/fixtureContext'

function Modal() {

    const { closeModal } = useFixtureContext()

  return (

    <div className='modal-container'>
        <div className='modal'>
            <div className='modal-content'>
                <p><b>Final Stage matches cannot end in a tie</b></p> 
                <p>If you think they are going to do so in the 90', plase add to the final score you predicted the result of the penalty shootout.</p>
                <p><i>For example: if you think the match is going to end in the 90' 1 - 1 and the penalty shootout 4 -3, write 5 - 4 as the final result.</i></p>
            </div>
        <button onClick={()=> closeModal()}>OK</button>
        </div>
    </div>

  )
}

export default Modal