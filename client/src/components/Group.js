import React, { useState, useEffect } from 'react'
import './Group.css'
import GroupPositions from './GroupPositions'
import Match from './Match'
import { useFixtureContext } from '../context/fixtureContext'

function Group({ group, countries }) {

  const [ positions, setPositions ] = useState([])
  const { setRound16, user } = useFixtureContext()

  useEffect(()=>{
    getGroupPositions()
    // eslint-disable-next-line
  }, [])

  useEffect(()=>{
    getRound16()
    // eslint-disable-next-line
  }, [positions])

  function getGroupPositions(){
      fetch(`http://localhost:3001/api/get-group/${user.uid}`, {
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
    fetch(`http://localhost:3001/api/set-round16/${user.uid}`, {
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
    <div className='group-stage-group-container'>
      <div className="group-stage-group">
        <h1 className='group-stage-group-name'>Group { group.group }</h1>
        {
            group.matches.map( match => <Match key={match.matchid} id={match.matchid} match={match} countries={countries} getGroupPositions={()=> getGroupPositions()} user={user} /> )
        }
      </div>  
        <GroupPositions key={"positions"+group.group} positions={positions}/>
    </div>
  )
}

export default Group