import React, {useState} from 'react';
import {Game} from "./TicTacToe/Game";
import {Link} from "react-router-dom";

export const GameLobby = () => {
    const [gridLength, setGridLength] = useState(3)

    return (
        <div>
            <Link to="/">Back to Home</Link>
            <h2>Select grid elements size</h2>
            <form>
                <label><input type="radio" name="grid" checked={gridLength === 3} value="3" onChange={() => setGridLength(3)}/>3</label>
                <label><input type="radio" name="grid" checked={gridLength === 4} value="4" onChange={() => setGridLength(4)}/>4</label>
                <label><input type="radio" name="grid" checked={gridLength === 5} value="5" onChange={() => setGridLength(5)}/>5</label>
            </form>
            <br/>
            <hr/>
            <br/>
            <Game gridLength={gridLength}/>
        </div>
    );
};