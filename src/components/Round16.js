import React from 'react'
import './Round16.css'
import Match from './Match'
import data from '../data/data'

function Round16() {
  return (
    <div className='round16'>
        <h1 className='round16-title'>Round of 16</h1>
        {
            data.round16.map( match => <Match match={match} data={data.countries}/>)
        }
    </div>
  )
}

export default Round16