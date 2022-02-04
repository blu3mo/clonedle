import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";

const checkCharMatch = (guess, answer) => {
  let guessArray = guess.split("")
  let answerArray = answer.split("")
  return guessArray.map((char, i) => {
    if (answerArray[i] === char) {
      return "eat"
    } else if (answerArray.includes(char)) {
      return "bite"
    } else {
      return ""
    }
  })
}

function GuessInput({ onGuess }) {
  const [val, setVal] = useState("");

  const handleChange = e => setVal(e.target.value);
  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      onGuess(val)
      setVal("")
    }
  }

  return (
    <div id="form">
      <input
        id="input"
        type="text"
        placeholder="_____"
        value={val}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {/*<button type="submit" onClick={handleClick}>予想する</button>*/}
    </div>
  );

}

function Guess({children, answer}) {
  const match = checkCharMatch(children, answer)
  return (
    <div>
      {[...children].map((char, i) => {
        return <p
            className={"guessChar " + match[i]}
            key={i}
        >
            {char}
        </p>
      })}
    </div>
  )
}

function App() {

  const answer = "apple"
  const [guesses, setGuesses] = useState([]);
  const [isCleared, setIsCleared] = useState(false);

  const maxTrialCount = 6;
  const trialsLeft = () => {
    return maxTrialCount - guesses.length
  }

  const judge = guess => {
    let lowerCasedGuess = guess.toLowerCase()

    if (trialsLeft() <= 0) return;
    if (lowerCasedGuess.length !== 5) return;
    if (isCleared) return;

    if (lowerCasedGuess === answer) {
      setIsCleared(true)
    }

    setGuesses([...guesses, lowerCasedGuess]);
  };

  return (
    <>
      <p id="title"> Clonedle </p>
      {guesses.map((guess, i) => {
        console.log(guess)
        return <Guess
          key={i}
          answer={answer}
        >
          {guess}
        </Guess>
      })}
      {[...Array(maxTrialCount-guesses.length)].map((e,i) => {
        return <Guess
          key={i}
          answer={answer}
        >
          {"     "}
        </Guess>
      })
      }
      <GuessInput onGuess={judge} />
    </>
  );
}

export default App;
