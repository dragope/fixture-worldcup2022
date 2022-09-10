import React, { useEffect, useState } from 'react'

function GroupPositions({group, close}) {

    const [ positions, setPositions ] = useState([])

    useEffect(()=>{
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
    .catch(err => console.error(err))
    }, [])

    console.log(positions)

  return (
    <div className='group-positions-container'>
        <p onClick={()=> close(false)}>X</p>
        {positions.groupStats && positions.groupStats.map( position => 
            <div>
                <p>{position.country} points: {position.points} won: {position.won} tied: {position.tied} lost: {position.lost} gf: {position.gf} ga:{position.ga} dg: {position.gf - position.ga}</p>
            </div>
        )}

    </div>
  )
}

export default GroupPositions