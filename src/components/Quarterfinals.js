import React from 'react'
import './Quarterfinals.css'
import Match from './Match'
import data from '../data/data'

function Quarterfinals() {
  return (
    <div className='quarterfinals'>
        <h1 className='quarterfinals-title'>Quarterfinals</h1>
        {
            data.quarterfinals.map( match => <div className='quarterfinals-match-container'><p>Match {match.matchid}</p><Match match={match} data={data.countries}/></div>)
        }
    </div>
  )
}

export default Quarterfinals