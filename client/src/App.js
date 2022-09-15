import './App.css';
import GroupStage from './components/GroupStage';
import FinalStages from './components/FinalStages';
import FixtureContextProvider from './context/fixtureContext';
import Modal from './components/Modal';

function App() {

  return (
    <div className="App">
      <FixtureContextProvider>
        <Modal />
        <GroupStage />
        <FinalStages />
      </FixtureContextProvider>
    </div>
  );
}

export default App;