import './App.css';
import GroupStage from './components/GroupStage';
import FinalStages from './components/FinalStages';
import FixtureContextProvider from './context/fixtureContext';

function App() {
  return (
    <div className="App">
      <FixtureContextProvider>
          <GroupStage />
          <FinalStages />
      </FixtureContextProvider>
    </div>
  );
}

export default App;