import Guess from "./Guess"
import GuessInput from "./GuessInput"
import React from "react";

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

export default Game;
