import React, { useContext, createContext, useState } from 'react'

const FixtureContext = createContext([]);

export const useFixtureContext = () => useContext(FixtureContext);

function FixtureContextProvider({ children }){

    const [ groupA, setGroupA ] = useState({1: 0, 2: 0, 3: 0, 4: 0})
    const [ groupB, setGroupB ] = useState({5: 0, 6: 0, 7: 0, 8: 0})
    const [ groupC, setGroupC ] = useState({9: 0, 10: 0, 11: 0, 12: 0})
    const [ groupD, setGroupD ] = useState({13: 0, 14: 0, 15: 0, 16: 0})
    const [ groupE, setGroupE ] = useState({17: 0, 18: 0, 19: 0, 20: 0})
    const [ groupF, setGroupF ] = useState({21: 0, 22: 0, 23: 0, 24: 0})
    const [ groupG, setGroupG ] = useState({25: 0, 26: 0, 27: 0, 28: 0})
    const [ groupH, setGroupH ] = useState({29: 0, 30: 0, 31: 0, 32: 0})
    
    return(
        <FixtureContextProvider value={{
            groupA, setGroupA, groupB, setGroupB, groupC, setGroupC, groupD, setGroupD, groupE, setGroupE, groupF, setGroupF, groupG, setGroupG, groupH, setGroupH
        }}>
            {children}
        </FixtureContextProvider>
    )
}

export default FixtureContextProvider