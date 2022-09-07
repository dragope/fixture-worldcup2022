import React from 'react'
import './Match.css'
import GenericFlag from '../images/icons8-flag-96.png'
import data from '../data/data'

function Match({ countries, match, id }) {

    const handleClick = () => {
        console.log(match.stage)
    }

  return (
        <div id={id} className="group-stage-group-match">
            <div className='group-stage-group-match-countries'>
                <div className='group-stage-group-match-team'>
                    {countries[match.local-1] ? 
                        <img className="group-stage-group-match-countries-flag" src={countries[match.local-1].flag} alt="Local Flag" /> 
                        : 
                        <img className="group-stage-group-match-countries-flag" src={GenericFlag} alt="Local Flag" /> 
                    }
                    <p><b>{countries[match.local-1] ? countries[match.local-1].name : "Qualified " + match.local}</b></p>
                </div>
                <div className='group-stage-group-match-results'>
                    <div className='group-stage-group-match-result-container'>
                        <label htmlFor="local">Local</label>
                        <input type="checkbox" onClick={handleClick} className='group-stage-group-match-result' />
                    </div>
                    { match.matchid < 49 && 
                        <div className='group-stage-group-match-result-container'>
                            <label htmlFor="local">Tie</label>
                            <input type="checkbox" className='group-stage-group-match-result' />
                        </div>
                    }
                    <div className='group-stage-group-match-result-container'>
                        <label htmlFor="local">Visitor</label>
                        <input type="checkbox" className='group-stage-group-match-result' />
                    </div>
                </div>
                <div className='group-stage-group-match-team'>
                    <p><b>{countries[match.visitor-1] ? countries[match.visitor-1].name : "Qualified " + match.visitor}</b></p>
                    {countries[match.visitor-1] ? 
                        <img className="group-stage-group-match-countries-flag" src={countries[match.visitor-1].flag} alt="Visitor Flag" /> 
                        : 
                        <img className="group-stage-group-match-countries-flag" src={GenericFlag} alt="Visitor Flag" />
                    }
                </div>
            </div>
            <p className='group-stage-group-match-date'>{new Date(match.date).getDate()}/{new Date(match.date).getMonth()}: {match.stadium} Stadium at {new Date(match.date).getUTCHours()}:00hs</p>
        </div>
    )
}

export default Match