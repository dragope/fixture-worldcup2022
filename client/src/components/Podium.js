import React, { useEffect } from 'react'
import './Podium.css'
import data from '../data/data'
import { useFixtureContext } from '../context/fixtureContext'
import WorldCup from '../images/world-cup.png'
import GenericFlag from '../images/icons8-flag-96.png'

function Podium() {

    const { final, thirdPlace, podium } = useFixtureContext()

    useEffect(()=>{},[final, thirdPlace, podium])

  return (
    <>
        {podium[2] &&
            <div className="podium">
                <h1>World Cup Champion</h1>
                <div className='podium-container-champion'>
                    <img src={WorldCup} className='podium-world-cup' alt='World Cup' />
                    <div className='podium-container-team'>
                        {/* <div className='podium-modal-medal' id="champion">1</div> */}
                        <img id='champion-flag' src={podium ? data.countries[podium[0].id-1].flag : GenericFlag}/>
                        <h1 id='champion-name'>{podium ? podium[0].country : "Champion"}</h1>
                        
                    </div>
                </div>
                <div className='podium-container-second'>
                    <div className='podium-container-team'>
                        <div className='podium-medal' id="silver">2</div>
                        <img src={podium ? data.countries[podium[1].id-1].flag : GenericFlag}/>
                        <h1>{podium ? podium[1].country : "Second"}</h1>
                        
                    </div>
                </div>
                <div className='podium-container-third'>
                    <div className='podium-container-team'>
                        <div className='podium-medal' id="bronze">3</div>
                        <img src={podium ? data.countries[podium[2].id-1].flag : GenericFlag}/>
                        <h1>{podium ? podium[2].country : "Third"}</h1>
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default Podium