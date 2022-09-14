import React, { useState, useEffect } from 'react'
import './Group.css'
import GroupPositions from './GroupPositions'
import Match from './Match'
import { useFixtureContext } from '../context/fixtureContext'

function Group({ group, countries, id }) {

  const [ positions, setPositions ] = useState([])
  const { setRound16 } = useFixtureContext()

  useEffect(()=>{
    getGroupPositions()
  }, [])

  useEffect(()=>{
    getRound16()
  }, [positions])

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
            .then(data => data.groupStats.sort((a,b)=>{
                if(b.points === a.points){
                  if((b.gf - b.ga) === (a.gf - a.ga)){
                    return b.gf - a.gf
                  } else {
                    return (b.gf - b.ga) - (a.gf - a.ga)
                  }
                } else {
                  return b.points - a.points;
                }
              }))
            .then(pos => setPositions(pos))
            .catch(err => console.error(err))
  }

  function getRound16(){
    positions[0] &&
    fetch(`http://localhost:3001/api/set-round16/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        first: {country: positions[0].country, countryid: positions[0].countryid, qualified: `${group.group}1`},
        second: {country: positions[1].country, countryid: positions[1].countryid, qualified: `${group.group}2`}
      })
    })
      .then(res => res.json())
      .then((data) => {
          setRound16(data.updatedRound)
        })
      .catch(err => console.error(err))
  }

  return (
    <div className='group-stage-group-container' id={id}>
      <div className="group-stage-group">
        <h1 className='group-stage-group-name'>Group { group.group }</h1>
        {
            group.matches.map( match => <Match id={match.matchid} match={match} countries={countries} getGroupPositions={()=> getGroupPositions()}/> )
        }
      </div>  
        <GroupPositions positions={positions}/>
    </div>
  )
}

export default Group