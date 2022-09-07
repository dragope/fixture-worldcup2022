import React from 'react'
import './ThirdPlace.css'
import Match from './Match'
import data from '../data/data'

function ThirdPlace() {
  return (
        <div className='third-place'>
        <h1 className='third-place-title'>Third Place</h1>
        {
            data.thirdplace.map( match => <div className='third-place-match-container'><p>Match {match.matchid}</p><Match match={match} data={data.countries}/></div>)
        }
    </div>
  )
}

export default ThirdPlace