import React, {useState} from 'react'
import './Match.css'
import GenericFlag from '../images/icons8-flag-96.png'

function Match({ countries, match, id }) {

    const [ submited, setSubmited ] = useState(false)
    const [ goalsLocal, setGoalsLocal ] = useState(0)
    const [ goalsVisitor, setGoalsVisitor ] = useState(0)

    const handleClick = () => {
        setSubmited(true)
        if(match.stage === "group"){
            fetch('http://localhost:3001/api/group-match/',
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                group: match.group, 
                matchid: match.matchid,
                local: match.local,
                visitor: match.visitor,
                countryLocal: countries[match.local-1].name,
                countryVisitor: countries[match.visitor-1].name,
                goalsLocal: goalsLocal,
                goalsVisitor: goalsVisitor,
            }),
            mode: 'cors'
        })
            .then(res => console.log(res))
        }
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
                        <input 
                            type="number" 
                            placeholder='0'
                            value={goalsLocal}
                            className='group-stage-group-match-result'
                            onChange={ e => setGoalsLocal(e.target.value) }
                        />
                    </div>
                    { submited ? <button onClick={()=> setSubmited(false)}>Modify</button> : <button onClick={handleClick}>Set</button> }
                    <div className='group-stage-group-match-result-container'>
                        <input 
                            type="number" 
                            value={goalsVisitor} 
                            className='group-stage-group-match-result'
                            onChange={ e => setGoalsVisitor(e.target.value) }
                        />
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