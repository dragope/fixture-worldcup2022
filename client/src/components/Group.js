import React, { useState, useEffect } from 'react'
import './Group.css'
import GroupPositions from './GroupPositions'
import Match from './Match'

function Group({ group, countries, id }) {

  const [ positions, setPositions ] = useState([])

  useEffect(()=>{
    getGroupPositions()
  }, [])

  function getGroupPositions(){
      fetch(`http://localhost:3001/api/get-group/`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              group: group.group,
              countries: group.countries
          })
          })
              .then(res => res.json())
              .then(data => setPositions(data))
              .then(console.log(positions))
              .then(console.log("Positions gotten"))
              .catch(err => console.error(err))
  }

  return (
    <div className='group-stage-group-container' id={id}>
      <div className="group-stage-group">
        <h1 className='group-stage-group-name'>Group { group.group }</h1>
        {
            group.matches.map( match => <Match id={match.matchid} match={match} countries={countries}/> )
        }
        <button onClick={()=> getGroupPositions()}>Get Group {group.group} Positions</button>
      </div>  
        <GroupPositions positions={positions}/>
    </div>
  )
}

export default Group