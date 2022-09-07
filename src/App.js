import './App.css';
import Final from './components/Final';
import GroupStage from './components/GroupStage';
import Quarterfinals from './components/Quarterfinals';
import Round16 from './components/Round16';
import Semifinals from './components/Semifinals';
import ThirdPlace from './components/ThirdPlace';

function App() {
  return (
    <div className="App">
      <GroupStage />
      <Round16 />
      <Quarterfinals />
      <Semifinals />
      <ThirdPlace />
      <Final />
    </div>
  );
}

export default App;