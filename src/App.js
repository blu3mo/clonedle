import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [val, setVal] = useState("");

  const maxTrialCount = 5
  const [trials, setTrials] = useState([]);

  const generateAnswer = () => {
    console.log("gen")
    return Math.floor(Math.random() * 49) + 1;
  }
  const [answer, setAnswer] = useState(generateAnswer);

  const [isGameCleared, setIsGameCleared] = useState(false);

  const handleChange = e => setVal(e.target.value)
  const handleTrial = e => {
    if (maxTrialCount-trials.length > 0 && !isGameCleared) {
      console.log(parseInt(val) === answer)
      if (parseInt(val) === answer) {
        setIsGameCleared(true)
      } else {
        setVal("")
        setTrials([...trials, val])
      }
    }
    console.log(answer)
  }

  const resetTrial = () => {
    setTrials([])
    setVal("")
    setAnswer(generateAnswer())
    setIsGameCleared(false)
  }

  return (
    <>
      <p>Wordle</p>
      <input
        value={val}
        onChange={handleChange}
      />
      <input
        type="button"
        value="予想する"
        onClick={handleTrial}
      />
      <p>
        {(isGameCleared) && "clear!"}
      </p>
      <p>
        { (trials.length > 0 && !isGameCleared) && ((answer > trials[trials.length - 1]) ? "もっと大きい" : "もっと小さい" )}
      </p>
      <p>
        あと{maxTrialCount-trials.length}回
      </p>
      <input
        type="button"
        value="はじめから"
        onClick={resetTrial}
      />
    </>
  )
}

export default App;
