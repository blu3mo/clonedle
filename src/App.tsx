import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";
import {
    ChangeEvent, KeyboardEvent, ReactNode
} from "../../../../../Library/Application Support/JetBrains/Toolbox/apps/IDEA-U/ch-0/213.6777.52/IntelliJ IDEA.app/Contents/plugins/JavaScriptLanguage/jsLanguageServicesImpl/external/react";

const checkCharMatch = (guess: string, answer: string) => {
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

function GuessInput(props: { onGuess: (guess: string) => void }) {
    const [val, setVal] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setVal(e.target.value);
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.keyCode === 13) {
            props.onGuess(val)
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

function Guess(props: {children: string, answer: string}) {
    const match = checkCharMatch(props.children, props.answer)
    return (
        <div>
            {[...props.children].map((char, i) => {
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
    const [guesses, setGuesses] = useState<string[]>([]);
    const [isCleared, setIsCleared] = useState(false);

    const maxTrialCount = 6;
    const trialsLeft = () => {
        return maxTrialCount - guesses.length
    }

    const judge = (guess: string) => {
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
