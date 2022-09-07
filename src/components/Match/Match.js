import React from 'react'
import './Match.css'

function Match({ data, match }) {
  return (
        <div id={match.id} className="fixture-match">
            <div className='fixture-match-countries'>
                <div className='fixture-match-team'>
                    <img className="fixture-match-countries-flag" src={data.countries[match.local-1].flag} alt="Local Flag" />
                    <p><b>{data.countries[match.local-1].name}</b></p>
                </div>
                <div className='fixture-match-results'>
                    <div className='fixture-match-result-container'>
                        <label htmlFor="local">Local</label>
                        <input type="checkbox" className='fixture-match-result' />
                    </div>
                    <div className='fixture-match-result-container'>
                        <label htmlFor="local">Tie</label>
                        <input type="checkbox" className='fixture-match-result' />
                    </div>
                    <div className='fixture-match-result-container'>
                        <label htmlFor="local">Visitor</label>
                        <input type="checkbox" className='fixture-match-result' />
                    </div>
                </div>
                <div className='fixture-match-team'>
                    <p><b>{data.countries[match.visitor-1].name}</b></p>
                    <img className="fixture-match-countries-flag" src={data.countries[match.visitor-1].flag} alt="Visitor Flag" />
                </div>
            </div>
            <p className='fixture-match-date'>{new Date(match.date).getDate()}/{new Date(match.date).getMonth()}: {match.stadium} Stadium at {new Date(match.date).getUTCHours()}:00hs</p>
        </div>
    )
}

export default Match