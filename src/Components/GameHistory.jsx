import React from 'react';

const GameHistory = ({ history }) => {

    return (
        <div>
            <h2>Game History</h2>
            <ul className="game-history-list">
                {history.map((game, index) => (
                    <li className="game-history-list-element" key={index}>
                        Game {index + 1}: Score: {game.score}, Questions answered: {game.questions}, Time taken: {game.totalTime / 1000} seconds, last question: {game.lastQuestion}, correct answer: {game.correctAnswer}, Last answer:{game.lastAnswer ? <span>{game.lastAnswer}.</span> : <span> Game was stopped.</span> }
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameHistory;