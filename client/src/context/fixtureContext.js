import React, { useContext, createContext, useState } from 'react'
import { useAuthContext } from './AuthContext';

const FixtureContext = createContext([]);

export const useFixtureContext = () => useContext(FixtureContext);

function FixtureContextProvider({ children }){

    const { user } = useAuthContext()

    const [ matchesPlayed, setMatchesPlayed ] = useState([])
    const [ loadGroupStage, setLoadGroupStage ] = useState(true)
    const [ loadFinalStages, setLoadFinalStages ] = useState(true)
    const [ loadPodiumModal, setLoadPodiumModal ] = useState(false)
    const [ round16, setRound16 ] = useState([])
    const [ quarterfinals, setQuarterfinals ] = useState([])
    const [ semifinals, setSemifinals ] = useState([])
    const [ thirdPlace, setThirdPlace ] = useState([])
    const [ final, setFinal ] = useState([])
    const [ podium, setPodium ] = useState([])
    const [ modalMessage, setModalMessage ] = useState(null)

    const getMatchesPlayed = () => {
        setLoadGroupStage(true)
        fetch(`${process.env.REACT_APP_BACK_URL}/api/get-matches-played/${user.uid}`)
        .then(res =>  res.status === 200 && res.json())
        .then(data => setMatchesPlayed(data))
        .then(setLoadGroupStage(false))
        .catch(err => console.error(err))
    }

    const getFinalStages = () => {
        setLoadFinalStages(true)
        fetch(`${process.env.REACT_APP_BACK_URL}/api/get-finalstages/${user.uid}`)
        .then(res => res.json())
        .then((data) => {
            setRound16(data.round16)
            setQuarterfinals(data.quarterfinals)
            setSemifinals(data.semifinals)
            setThirdPlace(data.thirdPlace)
            setFinal(data.final)
        })
        .then(()=> getMatchesPlayed())
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
        fetch(`${process.env.REACT_APP_BACK_URL}/api/get-podium/${user.uid}`)
        .then(res => res.json())
        .then((data) => {
            setPodium(data)
        })
    }

    const openModal = () => {
        const modal = document.querySelector('.modal-container')
        modal.style.visibility = 'visible';

    }
    const closeModal = () => {
        const modal = document.querySelector('.modal-container')
        modal.style.visibility = "hidden";
    }
    const openPodium = () => {
        const podiummodal = document.querySelector('.podium-modal-container')
        podiummodal.style.visibility = 'visible';
    }
    const closePodium = () => {
        const podiummodal = document.querySelector('.podium-modal-container')
        podiummodal.style.visibility = 'hidden';
    }

    return(
        <FixtureContext.Provider value={{
            getMatchesPlayed,
            getFinalStages,
            getPodium,
            matchesPlayed,
            loadPodiumModal,
            setLoadPodiumModal,
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
            openModal,
            closeModal,
            openPodium,
            closePodium,
            modalMessage, 
            setModalMessage
        }}>
            {children}
        </FixtureContext.Provider>
    )
}

export default FixtureContextProvider