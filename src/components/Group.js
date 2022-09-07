import React from 'react'
import './Group.css'
import Match from './Match'

function Group({ group, data }) {
  return (
    <div className='group-stage-group-container'>
        <h1 className='group-stage-group'>Group { group.group }</h1>
        {
            group.matches.map( match => <Match match={match} data={data}/> )
        }
    </div>
  )
}

export default Group