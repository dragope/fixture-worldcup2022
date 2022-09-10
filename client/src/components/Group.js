import React, { useState } from 'react'
import './Group.css'
import GroupPositions from './GroupPositions'
import Match from './Match'

function Group({ group, countries, id }) {

  const [ showPositions, setShowPositions ] = useState(false)
  
  return (
    <div className='group-stage-group-container' id={id}>
        <h1 className='group-stage-group'>Group { group.group }</h1>
        {
            group.matches.map( match => <Match id={match.matchid} match={match} countries={countries}/> )
        }
        <button onClick={()=> setShowPositions(true)}>Get Group {group.group}</button>
        {showPositions && <GroupPositions group={group} close={setShowPositions}/>}
    </div>
  )
}

export default Group