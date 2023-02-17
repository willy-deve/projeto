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

let guessesQty = 3


function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)


  const pickWordAndCategory = () => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category)

    const word = words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word)


    return { word, category }
  }

  const startGame = () => {

    const { word, category } = pickWordAndCategory();


    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    console.log(word, category)
    console.log(wordLetters)

    setGameStage(stages[1].name)

  }

  const verifyLetter = (letter) => {

    const normalizedLeter = letter.toLowerCase()

    if (guessedLetters.includes(normalizedLeter) || wrongLetters.includes(normalizedLeter)
    ) {
      return
    }

    if (letters.includes(normalizedLeter)) {
      setGuessedLetters((actualGuessesLetters) => [
        ...actualGuessesLetters,
        normalizedLeter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLeter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)

    }
  };


  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {

    if (guesses <= 0) {

      clearLetterStates()

      setGameStage(stages[2].name)
    }

  }, [guesses])

  const retry = () => {
    setScore(0)
    setGuesses(guessesQty);
    setGameStage(stages[0].name)
  }

  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}
      {gameStage === "end" && <End retry={retry} score={score} />}

    </div>
  );
}

export default App;
