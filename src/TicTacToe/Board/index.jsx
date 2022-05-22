import React from "react";
import {Square} from "../Square";
import "../../index.css";

export const Board = ({winningSquares, squares, onClick, gridLength}) => {

    const renderSquare = (i) => (
        <Square
            key={i}
            isHighlited={winningSquares.indexOf(i) > -1}
            value={squares[i]}
            updateStateOnClick={() => onClick(i)}
        />
    );

    const generateRow = (index, max) => {
        let rows = [];

        for (index; index < max; index++) {
            rows.push(renderSquare(index));
        }
        return rows;
    };

    const generateBoard = (elements) => {
        let board = [];

        /**
         * Generate (col * row, here, 3 * 3 = 9) squares
         */
        for (let i = 0; i < Math.pow(elements, 2); i++) {
            /**
             * Generate columns.
             *
             * Only allow multiples of "number of columns".
             * For example, if number of columns is 3, then,
             * 3, 6, 9.
             */
            if (i % elements === 0) {
                board.push(
                    <div className="board-row" key={i}>
                        {generateRow(i, i + elements)}
                    </div>
                );
            }
        }
        return board;
    };

    return (
        <div>
            <div>{generateBoard(gridLength)}</div>
        </div>
    );
}