import React, { useEffect} from 'react'
import './GroupPositions.css'

function GroupPositions({ positions }) {

    useEffect(()=>{
        console.log("Positions changed");
    },[positions])

  return (
    <div className='group-positions-container'>
        <div className='group-positions-indicators' >
                <p className="group-positions-team-indicator">Team</p>
                <div className='group-position-team-stats-indicators'>
                    <p>Pts</p> 
                    <p>P</p> 
                    <p>W</p>  
                    <p>T</p>  
                    <p>L</p>  
                    <p>GF</p>  
                    <p>GA</p> 
                    <p>GD</p>
                </div>
            </div>
        {positions.groupStats && positions.groupStats.map( position => 
            <div className='group-positions-team' id={positions.country}>
                <p className="group-positions-team-name">{position.country}</p>
                <div className='group-position-team-stats'>
                    <p className='group-position-team-stats-points'>{position.points}</p> 
                    <p>{position.played}</p> 
                    <p>{position.won}</p>  
                    <p>{position.tied}</p>  
                    <p>{position.lost}</p>  
                    <p>{position.gf}</p>  
                    <p>{position.ga}</p> 
                    <p>{position.gf - position.ga}</p>
                </div>
            </div>
        )}

    </div>
  )
}

export default GroupPositions