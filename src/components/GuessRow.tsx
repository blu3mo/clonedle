import React from "react";
import classNames from "classnames"
import {Guess, CharMatch} from "../models/Guess";

const GuessRow: React.VFC<{guess: Guess, answer: string}> = (props) => {
    const matchList = props.guess.checkMatch(props.answer)
    const matchClassNames = matchList.map((guess) => {
        switch (guess) {
            case CharMatch.Bite:
                return "bite"
            case CharMatch.Eat:
                return "eat"
            case CharMatch.None:
                return ""
        }
    })
    return (
        <div id="guessRow">
            {[...props.guess.value].map((char, i) => {
                return <p
                    className={"guessChar " + matchClassNames[i]}
                    key={i}
                >
                    {char}
                </p>
            })}
        </div>
    )
}

export default GuessRow;