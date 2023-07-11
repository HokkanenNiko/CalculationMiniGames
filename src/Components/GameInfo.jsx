import React from 'react';

function GameInfo({ score, timeRemaining, progressBarWidth }) {
    return (
        <div>
            <p>Score: {score}</p>
            <div className="progressBarContainer">
                <div
                    className="progressBar"
                    style={{ width: `${progressBarWidth}%` }}>
                </div>
                <div className="child">{timeRemaining}</div>
            </div>

        </div>
    );
}

export default GameInfo;