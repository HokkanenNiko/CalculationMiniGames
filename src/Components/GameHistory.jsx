import React, { useState } from 'react';
import './GameResults.css'; // Import the CSS file

const GameHistory = ({ history }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'gameNumber', direction: 'descending' });

    const sortedGames = [...history].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = key => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };
    return (
        <div>
            <h2>Game History</h2>

            <table className="game-results-table">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('gameNumber')}>Game</th>
                        <th onClick={() => requestSort('score')}>Score</th>
                        <th onClick={() => requestSort('questions')}>Questions answered</th>
                        <th onClick={() => requestSort('totalTime')}>Time taken (sec)</th>
                        <th onClick={() => requestSort('lastQuestion')}>Last question</th>
                        <th onClick={() => requestSort('correctAnswer')}>Correct answer</th>
                        <th onClick={() => requestSort('lastAnswer')}>Last answer</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedGames.map((game, index) => (
                        <tr key={index}>
                            <td>{game.gameNumber}</td>
                            <td>{game.score}</td>
                            <td>{game.questions}</td>
                            <td>{(game.totalTime / 1000).toFixed(2)}</td>
                            <td>{game.lastQuestion}</td>
                            <td>{game.correctAnswer}</td>
                            <td>{game.lastAnswer ? game.lastAnswer : "Game was stopped."}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GameHistory;