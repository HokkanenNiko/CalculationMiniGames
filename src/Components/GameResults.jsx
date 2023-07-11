import React from 'react';
import './GameResults.css'; // Import the CSS file


const GameResults = ({ lastQuestion, correctAnswer, lastAnswer, score }) => {

    return (
        <div>
            <h2>Game Over</h2>
            <table className="game-results-table">
                <thead>
                    <tr>
                        <th>Last question</th>
                        <th>Correct answer</th>
                        <th>Last answer</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{lastQuestion}</td>
                        <td>{correctAnswer}</td>
                        <td>{lastAnswer}</td>
                        <td>{score}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default GameResults;