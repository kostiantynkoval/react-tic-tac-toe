import React, {useState} from "react";
import {Board} from "../Board";
import {Info} from "../Info";
import {initialGameState, grids} from "../constants";
import "../../index.css";

export const Game = ({gridLength}) => {
    /**
     * Initial state of the game
     */
    const [gameState, setGameState] = useState(initialGameState);

    const reset = () => {
        setGameState(initialGameState);
    };
console.log(gameState)
    const jumpTo = step => {
        const historySnapshot = [ ...gameState.history ];

        historySnapshot.forEach(item => {
            item.active = false;
        });

        historySnapshot[step].active = true;
        setGameState({
            history: historySnapshot,
            stepNumber: step,
            xIsNext: step % 2 === 0
        });
    };

    const handleClick = i => {
        /**
         * If we jumped to some previous step, and then make
         * a new move from that point, we throw away all "future"
         * history that will now become irrelevant.
         *
         * slice(startingPoint, endPoint)
         *
         * startingPoint - Array index from where the "slicing" starts.
         * endPoint - All array indices less than endPoint will be included in "slicing"
         */
        const history = gameState.history.slice(0, gameState.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        /**
         * Calculate location of square when clicked
         */
        const col = Math.floor(i % gridLength) + 1;
        const row = Math.floor(i / gridLength) + 1;

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = gameState.xIsNext ? "X" : "O";

        /**
         * concat() method does not mutate the Array
         * unlike Array.push().
         */
        setGameState(prevState => ({
            history: history.concat([
                {
                    squares: squares,
                    location: {
                        col: col,
                        row: row
                    },
                    active: false,
                    moveNumber: history.length
                }
            ]),
            xIsNext: !prevState.xIsNext,
            stepNumber: history.length
        }));
    };

    const calculateWinner = (squares) => {

        let result = {
            status: "",
            win: {}
        };
        const lines = grids[gridLength];

        for (let i = 0; i < lines.length; i++) {
            const controlValue = squares[lines[i][0]];
            if (!controlValue) continue;

            if (
                lines[i].every( (val) => controlValue === squares[val] )
            ) {
                result = {
                    status: "win",
                    win: {player: controlValue, squares: lines[i]}
                };
                return result;
            }
        }
        let tempSq = squares.filter(item => item === null);
        if (tempSq.length === 0) {
            result = {status: "draw", win: {}};
            return result;
        }
        return null;
    };

    const current = gameState.history[gameState.stepNumber];
    const result = calculateWinner(current.squares);
    const gameStatus = result?.status ? result.status : null;

    const gameCurrentInfo = () => {
        if (gameStatus === "win") {
            return `Winner: ${result.win.player}`;
        }
        return "Next player: " + (gameState.xIsNext ? "X" : "O");
    }

    return (
        <div className="game">
            {/** If there is a draw, hide the game board and show
             "Play again" button */
                gameStatus === "draw" ? (
                    <div className="draw">
                        <h2>Draw!</h2>
                        <button onClick={reset}>Play again</button>
                    </div>
                ) : (
                    /** Otherwise, show the game board */
                    <div className="game-board">
                        <Board
                            gridLength={gridLength}
                            squares={current.squares}
                            winningSquares={gameStatus === "win" ? result.win.squares : []}
                            onClick={(i) => handleClick(i)}
                        />
                        {/** Depending upon the state of the game, either show
                         "Play again" button or "Reset game" button */
                            gameStatus === "win" ? (
                                <div className="win">
                                    <h2>{`"${result.win.player}" is winner!`}</h2>
                                    <button onClick={reset}>Play again</button>
                                </div>
                            ) : (
                                <div className="reset">
                                    <button onClick={reset}>Reset game</button>
                                </div>
                            )}
                    </div>
                )}
            <Info gameHistory={gameState.history} goToMove={jumpTo}>
                {gameCurrentInfo()}
            </Info>
        </div>
    );
}