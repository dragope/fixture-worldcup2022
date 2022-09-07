import React from 'react'
import './Final.css'
import Match from './Match'
import data from '../data/data'

function Final() {
  return (
        <div className='final'>
        <h1 className='final-title'>Final</h1>
        {
            data.final.map( match => <div className='final-match-container'><p>Match {match.matchid}</p><Match match={match} data={data.countries}/></div>)
        }
    </div>
  )
}

export default Final