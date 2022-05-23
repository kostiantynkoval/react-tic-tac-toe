import React, {useState} from 'react';
import {Game} from "./TicTacToe/Game";
import {Link} from "react-router-dom";
import {gridLengths} from "./TicTacToe/constants";

export const GameLobby = () => {
    const [gridLength, setGridLength] = useState(3)

    return (
        <div>
            <Link to="/">Back to Home</Link>
            <h2>Select grid elements size</h2>
            <form>
                {
                    gridLengths.map(value => (
                        <label
                            key={value}
                        >
                            <input
                                type="radio"
                                name="grid"
                                checked={gridLength === value}
                                value={value}
                                onChange={() => setGridLength(value)}/>
                            {value}
                        </label>
                    ))
                }
            </form>
            <br/>
            <hr/>
            <br/>
            <Game gridLength={gridLength}/>
        </div>
    );
};