import React from 'react'
import './Modal.css'
import { useFixtureContext } from '../context/fixtureContext'

function Modal({}) {

    const { closeModal, modalMessage } = useFixtureContext()

  return (

    <div className='modal-container'>
        <div className='modal'>
            <div className='modal-content'>
                {modalMessage}
            </div>
        <button onClick={()=> closeModal()}>OK</button>
        </div>
    </div>

  )
}

export default Modal