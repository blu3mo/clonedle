import React from "react"

const GuessInput: React.VFC<{onGuess: (guess: string) => void}> = (props) => {
    const [val, setVal] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setVal(e.target.value);
    const handleKeyDown = (e: React.KeyboardEvent) => {
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
        </div>
    );
}

export default GuessInput