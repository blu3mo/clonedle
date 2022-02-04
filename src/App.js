import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";

const random = (max) => {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
};

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
        value={val}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {/*<button type="submit" onClick={handleClick}>予想する</button>*/}
    </div>
  );
}

function Guess({children, match}) {
  let i = 0

  return (
    <div>
      {[...children].map((char, i) => {
        return <p
            className={"guessChar " + match[i]}
            key={i}
        >
            {char}
        </p>
        i++;
      })}
    </div>
  )
}

function App() {
  const max = 50;
  const initialCount = 6;
  const [answer, setAnswer] = useState("apple");
  const [count, setCount] = useState(initialCount);
  const [message, setMessage] = useState('');
  const [guesses, setGuesses] = useState([]);

  const judge = guess => {
    if (count === 0) return;

    setCount(count - 1);

    if (guess === answer) {
      setMessage('正解です！');
    } else if (count === 1) {
      setMessage('残念でした！ 正解は' + answer);
    }

    setGuesses([...guesses, guess]);
    console.log(guesses)
  };

  const replay = () => {
    setAnswer(random(max));
    setCount(initialCount);
    setMessage('');
  };

  let i = 0
  return (
    <>
      {/*<p>{message}</p>*/}
      <p>あと{count}回</p>
      {/*<p>*/}
      {/*  <button onClick={replay}>はじめから</button>*/}
      {/*</p>*/}
      {guesses.map(guess => {
        console.log(guess)
        i++
        return <Guess
          key={i}
          match={checkCharMatch(guess, answer)}
        >
          {guess}
        </Guess>
      })}
      <GuessInput onGuess={judge} />
    </>
  );
}

export default App;
