import React, { useContext, createContext, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';


const FixtureContext = createContext([]);

export const useFixtureContext = () => useContext(FixtureContext);

function FixtureContextProvider({ children }){

    const [ matchesPlayed, setMatchesPlayed ] = useState([])
    const [ loadGroupStage, setLoadGroupStage ] = useState(true)
    const [ loadFinalStages, setLoadFinalStages ] = useState(true)
    const [ round16, setRound16 ] = useState([])
    const [ quarterfinals, setQuarterfinals ] = useState([])
    const [ semifinals, setSemifinals ] = useState([])
    const [ thirdPlace, setThirdPlace ] = useState([])
    const [ final, setFinal ] = useState([])
    const [ podium, setPodium ] = useState([])
    const [ modal, setModal ] = useState(false)
    const [ user, setUser ] = useState({})

    onAuthStateChanged(auth, (data)=>{
        if(data){
          setUser(data)
        }
    })

    const getMatchesPlayed = () => {
        fetch(`http://localhost:3001/api/get-matches-played/${user.uid}`)
        .then(res =>  res.status === 200 && res.json())
        .then(data => setMatchesPlayed(data))
        .then(setLoadGroupStage(false))
        .catch(err => console.error(err))
    }

    const getFinalStages = () => {
        fetch(`/api/get-finalstages/${user.uid}`)
        .then(res => res.json())
        .then((data) => {
            setQuarterfinals(data.quarterfinals)
            setSemifinals(data.semifinals)
            setThirdPlace(data.thirdPlace)
            setFinal(data.final)
        })
        .then(setLoadFinalStages(false))
        .catch(err => console.error(err))

        // fetch('/api/get-quarterfinals')
        // .then(res => res.json())
        // .then(data => setQuarterfinals(data))
        // .then(setLoadFinalStages(false))
        // .catch(err => console.error(err))

        // fetch('/api/get-semifinals')
        // .then(res => res.json())
        // .then(data => setSemifinals(data))
        // .then(setLoadFinalStages(false))
        // .catch(err => console.error(err))

        // fetch('/api/get-thirdplace/')
        // .then(res => res.json())
        // .then(data => setThirdPlace(data))
        // .then(setLoadFinalStages(false))
        // .catch(err => console.error(err))

        // fetch('/api/get-final/')
        // .then(res => res.json())
        // .then(data => setFinal(data))
        // .then(setLoadFinalStages(false))
        // .catch(err => console.error(err))
    }

   const getPodium = () => {
        fetch(`/api/get-podium/${user.uid}`)
        .then(res => res.json())
        .then(data => setPodium(data))
    }

    return(
        <FixtureContext.Provider value={{
            user,
            setUser,
            getMatchesPlayed,
            getFinalStages,
            getPodium,
            matchesPlayed,
            podium,
            setPodium,
            loadGroupStage,
            setLoadGroupStage,
            loadFinalStages, 
            setLoadFinalStages, 
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