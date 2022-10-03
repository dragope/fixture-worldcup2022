import React from 'react'
import './GroupPositions.css'

function GroupPositions({ positions, group }) {

  return (
    <div className='group-positions-container'>
        <div>
        <p className="group-positions-group">Group</p>
        <h1 className="group-positions-group-letter">{group}</h1>
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
        {positions && positions.map( position => 
            <div className='group-positions-team' id={positions.country}>
                <div>
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
            </div>
        )}
        </div>
    </div>
  )
}

export default GroupPositions