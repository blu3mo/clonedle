import GuessRow from "./GuessRow"
import GuessInput from "./GuessInput"
import React from "react";
import {Guess} from "../models/Guess";

const Game: React.VFC = () => {
    const answer = "apple"
    const [guesses, setGuesses] = React.useState<string[]>([]);
    const [isCleared, setIsCleared] = React.useState(false);

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
                return <GuessRow
                    key={i}
                    guess={new Guess(guess)}
                    answer={answer}
                />
            })}
            {[...Array(maxTrialCount-guesses.length)].map((e,i) => {
                return <GuessRow
                    key={i}
                    guess={new Guess("     ")}
                    answer={answer}
                />
            })
            }
            <GuessInput onGuess={judge} />
        </>
    );
}

export default Game;
