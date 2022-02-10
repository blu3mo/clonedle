import React from "react";

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

const Guess: React.VFC<{children: string, answer: string}> = (props) => {
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

export default Guess;