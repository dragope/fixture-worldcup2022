import React, { useContext, createContext, useState } from 'react'

const FixtureContext = createContext([]);

export const useFixtureContext = () => useContext(FixtureContext);

function FixtureContextProvider({ children }){

    const [ matchesPlayed, setMatchesPlayed ] = useState([])
    const [ load, setLoad ] = useState(true)
    const [ round16, setRound16 ] = useState([])
    const [ quarterfinals, setQuarterfinals ] = useState([])
    const [ semifinals, setSemifinals ] = useState([])
    const [ thirdPlace, setThirdPlace ] = useState([])
    const [ final, setFinal ] = useState([])
    const [ modal, setModal ] = useState(false)

    const getMatchesPlayed = () => {
        fetch(`http://localhost:3001/api/get-matches-played/`)
            .then(res => res.json())
            .then(data => setMatchesPlayed(data))
            .then(setLoad(false))
            .catch(err => console.error(err))
    }

    const getFinalStages = () => {
        fetch('/api/get-quarterfinals')
        .then(res => res.json())
        .then(data => setQuarterfinals(data))
        .catch(err => console.error(err))

        fetch('/api/get-semifinals')
        .then(res => res.json())
        .then(data => setSemifinals(data))
        .catch(err => console.error(err))

        fetch('/api/get-thirdplace/')
        .then(res => res.json())
        .then(data => setThirdPlace(data))
        .catch(err => console.error(err))

        fetch('/api/get-final/')
        .then(res => res.json())
        .then(data => setFinal(data))
        .catch(err => console.error(err))
    }

    return(
        <FixtureContext.Provider value={{
            getMatchesPlayed,
            getFinalStages,
            matchesPlayed,
            load,
            setLoad,
            round16,
            setRound16,
            quarterfinals,
            setQuarterfinals,
            semifinals,
            setSemifinals,
            thirdPlace,
            setThirdPlace,
            final,
            setFinal,
            modal,
            setModal
        }}>
            {children}
        </FixtureContext.Provider>
    )
}

export default FixtureContextProvider