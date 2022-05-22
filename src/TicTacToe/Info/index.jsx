import React, {useState} from 'react';

export const Info = ({children, gameHistory, goToMove}) => {
    const [isToggled, setIsToggled] = useState(false);

    const toggleMoves = () => {
        setIsToggled(prevState => !prevState)
    };

    const moves = gameHistory.map((move, index) => (
            <li key={index}>
                <button
                    className={move.active ? "active" : "normal"}
                    key={`${move.location.col}_${move.location.row}`}
                    onClick={() => goToMove(index)}
                >
                    {`${index ? "Go to move # " + index : "Go to game start"} (${move.location.col}, ${move.location.row})`}
                </button>
            </li>
        )
    );

    /**
     * If this.state.toggle is "true", sort in
     * "decending order" and vice versa.
     */
    moves.sort((a, b) => {
        if (isToggled) {
            return b.key - a.key;
        } else {
            return a.key - b.key;
        }
    });

    return (
        <div className="game-info">
            <div>{children}</div>
            {/** Show the toggle button only if there are two or more moves to sort */
                gameHistory.length > 1 ? (
                    <button onClick={toggleMoves}>Toggle moves</button>
                ) : (
                    ""
                )}
            <ol>{moves}</ol>
        </div>
    );
};