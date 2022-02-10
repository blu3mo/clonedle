import GuessRow from "./GuessRow"
import GuessInput from "./GuessInput"
import React from "react";
import {Guess} from "../models/Guess";

const Game: React.VFC = () => {
    const answer = "apple"
    const [guesses, setGuesses] = React.useState<Guess[]>([]);
    const [isCleared, setIsCleared] = React.useState(false);

    const maxTrialCount = 6;
    const trialsLeft = () => {
        return maxTrialCount - guesses.length
    }

    const onGuess = (input: string) => {
        if (trialsLeft() <= 0) return;
        if (input.length !== 5) return;
        if (isCleared) return;

        if (input === answer) {
            setIsCleared(true)
        }

        setGuesses([...guesses, new Guess(input)]);
    };

    return (
        <div id="game">
            {guesses.map((guess, i) => {
                console.log(guess)
                return <GuessRow
                    key={i}
                    guess={guess}
                    answer={answer}
                />
            })}
            {[...Array(maxTrialCount-guesses.length)].map((_,i) => {
                return <GuessRow
                    key={i}
                    guess={new Guess("     ")}
                    answer={answer}
                />
            })
            }
            <GuessInput onGuess={onGuess} />
        </div>
    );
}

export default Game;
