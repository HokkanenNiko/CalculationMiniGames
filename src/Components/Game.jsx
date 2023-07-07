import React, { useState } from 'react';
import GameOptionsContext from './GameOptionsContext';
import CalculationGame from './CalculationGame';
import './Game.css'; // Import the CSS file

function Game() {
    const [operators, setOperators] = useState({
        addition: false,
        subtraction: false,
        multiplication: true,
        division: false
    });
    const [availableTime, setAvailableTime] = useState(15);
    const [numberOfDigitsInCalculation, setNumberOfDigitsInCalculation] = useState(1);
    const [optionsVisible, setOptionsVisible] = useState(true);

    return (
        <GameOptionsContext.Provider value={{ operators, setOperators, availableTime, setAvailableTime, numberOfDigitsInCalculation, setNumberOfDigitsInCalculation, setOptionsVisible }}>

            <div>
                {optionsVisible ? (
                    <div>

            <h2>Game Options</h2>
            <label>
                <input
                    type="checkbox"
                    checked={operators.addition}
                    onChange={(e) => setOperators({ ...operators, addition: e.target.checked })}
                />
                Addition
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={operators.subtraction}
                    onChange={(e) => setOperators({ ...operators, subtraction: e.target.checked })}
                />
                Subtraction
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={operators.multiplication}
                    onChange={(e) => setOperators({ ...operators, multiplication: e.target.checked })}
                />
                Multiplication
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={operators.division}
                    onChange={(e) => setOperators({ ...operators, division: e.target.checked })}
                />
                Division
            </label>
                <br />

            <label>
                Time (seconds):
                <input
                        className="input-textbox-options"
                        min="1"
                    type="number"
                    value={availableTime}
                    onChange={(e) => setAvailableTime(e.target.value)}
                />
                    </label>
                <br />

                <label>
                    Maximum number of digits used for factors in calculations.
                    <input
                        className="input-textbox-options" 
                        min="1"

                        type="number"
                        value={numberOfDigitsInCalculation}
                        onChange={(e) => setNumberOfDigitsInCalculation(e.target.value)}
                    />
                    </label>
                    </div>
                ) : <div></div>}
                <CalculationGame />

            </div>
        </GameOptionsContext.Provider>

    );
}

export default Game;