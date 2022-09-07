import React from 'react'
import './Group.css'
import Match from './Match'

function Group({ group, countries, id }) {
  return (
    <div className='group-stage-group-container' id={id}>
        <h1 className='group-stage-group'>Group { group.group }</h1>
        {
            group.matches.map( match => <Match id={match.matchid} match={match} countries={countries}/> )
        }
    </div>
  )
}

export default Group