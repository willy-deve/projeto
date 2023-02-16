import './App.css';
import StartScreen from './components/StartScreen/StartScreen';

import { useCallback, useEffect, useState } from 'react';

import { wordsList } from "./components/data/Word";
import Game from './components/game/Game';
import End from './components/end/End';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
];



function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)


  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen />}
      {gameStage === "game" && <Game />}
      {gameStage === "end" && <End />}

    </div>
  );
}

export default App;
