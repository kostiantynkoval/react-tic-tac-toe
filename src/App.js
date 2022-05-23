import React, {useState} from "react";
import {Game} from "./TicTacToe/Game";
import logo from './logo.svg';
import './App.css';

export const App = () => {
    const [gridLength, setGridLength] = useState(3)
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Hello Rebike !!!
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <form>
                <label><input type="radio" name="grid" checked={gridLength === 3} value="3" onClick={() => setGridLength(3)}/>3</label>
                <label><input type="radio" name="grid" checked={gridLength === 4} value="4" onClick={() => setGridLength(4)}/>4</label>
                <label><input type="radio" name="grid" checked={gridLength === 5} value="5" onClick={() => setGridLength(5)}/>5</label>
            </form>
            <Game gridLength={gridLength}/>
        </div>
    );
}
