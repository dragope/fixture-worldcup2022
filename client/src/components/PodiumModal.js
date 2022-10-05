import React from 'react'
import { useFixtureContext } from '../context/fixtureContext'
import data from '../data/data'
import GenericFlag from '../images/icons8-flag-96.png'
import './PodiumModal.css'
import './Modal.css'
import './Podium.css'
import WorldCup from '../images/world-cup.png'

function PodiumModal() {

    const { podium, closePodium } = useFixtureContext()

  return (
    <div className='podium-modal-container'>
        {podium[2] &&
            <div className="podium-modal">
                <div className='podium-modal-button-container'><button onClick={closePodium}>X</button></div>
                <h1>World Cup Champion</h1>
                <div className='podium-modal-container-champion'>
                    <img src={WorldCup} className='podium-modal-world-cup' alt='World Cup' />
                    <div className='podium-modal-container-team'>
                        {/* <div className='podium-modal-medal' id="champion">1</div> */}
                        <img id='champion-flag' src={podium ? data.countries[podium[0].id-1].flag : GenericFlag}/>
                        <h1 id='champion-name'>{podium ? podium[0].country : "Champion"}</h1>
                        
                    </div>
                </div>
                <div className='podium-modal-container-second'>
                    <div className='podium-modal-container-team'>
                        <div className='podium-modal-medal' id="silver">2</div>
                        <img src={podium ? data.countries[podium[1].id-1].flag : GenericFlag}/>
                        <h1>{podium ? podium[1].country : "Second"}</h1>
                        
                    </div>
                </div>
                <div className='podium-modal-container-third'>
                    <div className='podium-modal-container-team'>
                        <div className='podium-modal-medal' id="bronze">3</div>
                        <img src={podium ? data.countries[podium[2].id-1].flag : GenericFlag}/>
                        <h1>{podium ? podium[2].country : "Third"}</h1>
                    </div>
                </div>
            </div>
        }
    </div>

  )
}

export default PodiumModal