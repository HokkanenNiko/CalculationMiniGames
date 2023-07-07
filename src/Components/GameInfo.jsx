import React from 'react';

function GameInfo({ score, timeRemaining, progressBarWidth }) {
    return (
        <div>
            <p>Score: {score}</p>
            <p>Time Remaining: {timeRemaining} seconds</p>
            <div className="progressBarContainer">
                <div
                    className="progressBar"
                    style={{ width: `${progressBarWidth}%` }}
                ></div>
            </div>

        </div>
    );
}

export default GameInfo;