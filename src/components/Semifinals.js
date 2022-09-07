import React from 'react'
import './Semifinals.css'
import Match from './Match'
import data from '../data/data'

function Semifinals() {
  return (
    <div className='semifinals'>
        <h1 className='semifinals-title'>Semifinals</h1>
        {
            data.semifinals.map( match => <div className='semifinals-match-container'><p>Match {match.matchid}</p><Match match={match} data={data.countries}/></div>)
        }
    </div>
  )
}

export default Semifinals