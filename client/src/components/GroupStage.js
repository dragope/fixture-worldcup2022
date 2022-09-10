import React from 'react'
import './GroupStage.css'
import Group from './Group'
import data from '../data/data'

function GroupStage() {
  return (
    <div className='group-stage'>
      <h1 className='group-stage-title'>Group Stage</h1>
        {
            data.groups.map( group => <Group id={group.group} group={group} countries={data.countries}/>)
        }
    </div>
  )
}

export default GroupStage