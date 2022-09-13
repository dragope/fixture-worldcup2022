import React, { useContext, createContext, useState } from 'react'

const FixtureContext = createContext([]);

export const useFixtureContext = () => useContext(FixtureContext);

function FixtureContextProvider({ children }){

    const [ matchesPlayed, setMatchesPlayed ] = useState([])
    const [ load, setLoad ] = useState(true)

    const getMatchesPlayed = () => {
        fetch(`http://localhost:3001/api/get-matches-played/`)
            .then(res => res.json())
            .then(data => setMatchesPlayed(data))
            .then(setLoad(false))
            .catch(err => console.error(err))
    }
    
    return(
        <FixtureContext.Provider value={{
            getMatchesPlayed,
            matchesPlayed,
            load,
            setLoad
        }}>
            {children}
        </FixtureContext.Provider>
    )
}

export default FixtureContextProvider