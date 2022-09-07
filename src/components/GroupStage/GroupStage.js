import React from 'react'
import './GroupStage.css'
import Match from '../Match/Match'
import data from '../../data/data'

function GroupStage() {

  return (
    <div className='fixture'>
        <div className='fixture-group-container'>
            <h1 className='fixture-group'>Group A</h1>
            {
            data.groupA.matches.map( match => <Match data={data} match={match}/>)
            }
        </div>
        <div className='fixture-group-container'>
            <h1 className='fixture-group'>Group B</h1>
            {
            data.groupB.matches.map( match => <Match data={data} match={match}/>)
            }
        </div>
        <div className='fixture-group-container'>
            <h1 className='fixture-group'>Group C</h1>
            {
            data.groupC.matches.map( match => <Match data={data} match={match}/>)
            }
        </div>
        <div className='fixture-group-container'>
            <h1 className='fixture-group'>Group D</h1>
            {
            data.groupD.matches.map( match => <Match data={data} match={match}/>)
            }
        </div>
        <div className='fixture-group-container'>
            <h1 className='fixture-group'>Group E</h1>
            {
            data.groupE.matches.map( match => <Match data={data} match={match}/>)
            }
        </div>
        <div className='fixture-group-container'>
            <h1 className='fixture-group'>Group F</h1>
            {
            data.groupF.matches.map( match => <Match data={data} match={match}/>)
            }
        </div>
        <div className='fixture-group-container'>
            <h1 className='fixture-group'>Group G</h1>
            {
            data.groupG.matches.map( match => <Match data={data} match={match}/>)
            }
        </div>
        <div className='fixture-group-container'>
            <h1 className='fixture-group'>Group H</h1>
            {
            data.groupH.matches.map( match => <Match data={data} match={match}/>)
            }
        </div>
    </div>
  )
}

export default GroupStage