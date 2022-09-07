import React from 'react'
import './Round16.css'
import Match from './Match'
import data from '../data/data'

function Round16() {
  return (
    <div className='round16'>
        <h1 className='round16-title'>Round of 16</h1>
        {
            data.round16.map( match => <div className='round16-match-container'><p>Match {match.matchid}</p><Match match={match} data={data.countries}/></div>)
        }
    </div>
  )
}

export default Round16