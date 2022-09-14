import React, {useEffect, useState} from 'react'
import './Match.css'
import GenericFlag from '../images/icons8-flag-96.png'
import { useFixtureContext } from '../context/fixtureContext'
import OpenedResult from './OpenedResult'
import SetResult from './SetResult'

function Match({ countries, match, id, getGroupPositions, round }) {

    const { matchesPlayed } = useFixtureContext()
    const [ submited, setSubmited ] = useState(false)    
    const [ goalsLocal, setGoalsLocal ] = useState(0)
    const [ goalsVisitor, setGoalsVisitor ] = useState(0)
    const [ savedResult, setSavedResult ] = useState([])
    const [ matchContenders, setMatchContenders ] = useState({})

    useEffect(()=>{
        const prevMatch = matchesPlayed.filter( x => x.matchid === id)
        if(prevMatch[0]){
            setSubmited(true)
        }
        setSavedResult(prevMatch)
    }, [matchesPlayed])

    useEffect(()=>{
        if(round){
            let match = round.filter(x => x.matchid === id)
            setMatchContenders(match)
        }
    }, [round])

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
                }
            )
                .then(res => res.status === 200 && getGroupPositions())
                .catch(err => console.error(err))
        }
    }

    if(matchContenders[0]){ console.log(matchContenders) }

  return (
        <div id={id} className="group-stage-group-match">
            <div className='group-stage-group-match-countries'>
                <div className='group-stage-group-match-team'>
                    {matchContenders[0] ?
                        <img className="group-stage-group-match-countries-flag" src={matchContenders[0].countryLocal.length > 2 ? countries[Number(matchContenders[0].local)-1].flag : GenericFlag} alt="Local Flag" /> 
                        :
                        countries[match.local-1] ? 
                        <img className="group-stage-group-match-countries-flag" src={countries[match.local-1].flag} alt="Local Flag" /> 
                        : 
                        <img className="group-stage-group-match-countries-flag" src={GenericFlag} alt="Local Flag" /> 
                    }
                    <p><b>{matchContenders[0] ? matchContenders[0].countryLocal.length > 2 ? countries[Number(matchContenders[0].local)-1].name : "Qualified " + match.local : countries[match.local-1] ? countries[match.local-1].name : "Qualified " + match.local}</b></p>
                </div>
                { savedResult[0] ? 
                    submited ?
                        <SetResult savedResult={savedResult} setGoalsLocal={setGoalsLocal} setGoalsVisitor={setGoalsVisitor} submited={submited} setSubmited={setSubmited} handleClick={handleClick} goalsLocal={goalsLocal} goalsVisitor={goalsVisitor}/>
                        :
                        <OpenedResult savedResult={savedResult} setGoalsLocal={setGoalsLocal} setGoalsVisitor={setGoalsVisitor} submited={submited} setSubmited={setSubmited} handleClick={handleClick} goalsLocal={goalsLocal} goalsVisitor={goalsVisitor}/>
                    :
                    !submited ?
                        <OpenedResult savedResult={savedResult} setGoalsLocal={setGoalsLocal} setGoalsVisitor={setGoalsVisitor} submited={submited} setSubmited={setSubmited} handleClick={handleClick} goalsLocal={goalsLocal} goalsVisitor={goalsVisitor}/>
                        :
                        <SetResult savedResult={savedResult} setGoalsLocal={setGoalsLocal} setGoalsVisitor={setGoalsVisitor} submited={submited} setSubmited={setSubmited} handleClick={handleClick} goalsLocal={goalsLocal} goalsVisitor={goalsVisitor}/>
                }
                <div className='group-stage-group-match-team'>
                    <p><b>{matchContenders[0] ? matchContenders[0].countryVisitor.length > 2 ? countries[Number(matchContenders[0].visitor)-1].name : "Qualified " + match.visitor : countries[match.visitor-1] ? countries[match.visitor-1].name : "Qualified " + match.visitor}</b></p>
                    {matchContenders[0] ?
                        <img className="group-stage-group-match-countries-flag" src={matchContenders[0].countryVisitor.length > 2 ? countries[Number(matchContenders[0].visitor)-1].flag : GenericFlag} alt="Local Flag" /> 
                        :
                        countries[match.visitor-1] ? 
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