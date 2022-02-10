import exp from "constants";

export enum CharMatch {
    None,
    Bite,
    Eat
}

export class Guess {
    value: string

    constructor(value: string) {
        this.value = value
    }

    checkMatch(answer: string): CharMatch[] {
        let guessArray = this.value.split("")
        let answerArray = answer.split("")
        return guessArray.map((char, i) => {
            if (answerArray[i] === char) {
                return CharMatch.Eat
            } else if (answerArray.includes(char)) {
                return CharMatch.Bite
            } else {
                return CharMatch.None
            }
        })
    }
}