import React, { useEffect, useState } from 'react'
import './Podium.css'
import data from '../data/data'
import { useFixtureContext } from '../context/fixtureContext'

function Podium() {

    const { final, thirdPlace, podium } = useFixtureContext()

    useEffect(()=>{

    },[final, thirdPlace, podium])

  return (
    <>
        {podium[2] &&
            <div className='podium-container'>
                <div className='podium-container-champion'>
                    <div className='podium-container-team'>
                        <div className='podium-medal' id="champion">1</div>
                        <img src={data.countries[podium[0].id-1].flag}/>
                        <h1>{podium[0].country}</h1>
                        
                    </div>
                </div>
                <div className='podium-container-second'>
                    <div className='podium-container-team'>
                        <div className='podium-medal' id="silver">2</div>
                        <img src={data.countries[podium[1].id-1].flag}/>
                        <h1>{podium[1].country}</h1>
                        
                    </div>
                </div>
                <div className='podium-container-third'>
                    <div className='podium-container-team'>
                        <div className='podium-medal' id="bronze">3</div>
                        <img src={data.countries[podium[2].id-1].flag}/>
                        <h1>{podium[2].country}</h1>
                    </div>
                </div>
            </div>

        }
    </>
  )
}

export default Podium