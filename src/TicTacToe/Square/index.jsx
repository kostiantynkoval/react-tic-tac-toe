import React from "react";

export const Square = props => {
    return (
        <button
            className={`square ${props.isHighlited ? "winningSquares" : "" }`}
            onClick={props.updateStateOnClick}
        >
            {props.value}
        </button>
    );
};