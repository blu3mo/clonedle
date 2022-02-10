import Game from "./components/Game"
import React from "react";
import './App.css';
import { HiMenu } from 'react-icons/hi';

function App() {
    return (
        <>
            <header>
                <span id="menu"><HiMenu /></span>
                <span id="title">Clonedle</span>
                <span></span>
            </header>
            <Game />
            <footer>

            </footer>
        </>
    );
}

export default App;
