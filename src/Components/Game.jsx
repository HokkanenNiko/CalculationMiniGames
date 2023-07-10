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
    const [factors, setFactors] = useState({
        "0": true,
        "1": true,
        "2": true,
        "3": true,
        "4": true,
        "5": true,
        "6": true,
        "7": true,
        "8": true,
        "9": true
    });
    const [availableTime, setAvailableTime] = useState(15);
    const [numberOfDigitsInCalculation, setNumberOfDigitsInCalculation] = useState(1);
    const [optionsVisible, setOptionsVisible] = useState(true);

    return (
        <GameOptionsContext.Provider value={{ operators, setOperators, availableTime, setAvailableTime, numberOfDigitsInCalculation, setNumberOfDigitsInCalculation, setOptionsVisible, factors, setFactors }}>

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
                        <p>Use following numbers as calculation factors:</p>
                        <label>
                            <input
                                type="checkbox"
                                checked={factors[0]}
                                onChange={(e) => { setFactors({ ...factors, 0: e.target.checked }); }}
                            />
                            0
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={factors[1]}
                                onChange={(e) => { setFactors({ ...factors, 1: e.target.checked }); }}
                            />
                            1
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={factors[2]}
                                onChange={(e) => { setFactors({ ...factors, 2: e.target.checked }); }}
                            />
                            2
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={factors[3]}
                                onChange={(e) => { setFactors({ ...factors, 3: e.target.checked }); }}
                            />
                            3
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={factors[4]}
                                onChange={(e) => { setFactors({ ...factors, 4: e.target.checked }); }}
                            />
                            4
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={factors[5]}
                                onChange={(e) => { setFactors({ ...factors, 5: e.target.checked }); }}
                            />
                            5
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={factors[6]}
                                onChange={(e) => { setFactors({ ...factors, 6: e.target.checked }); }}
                            />
                            6
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={factors[7]}
                                onChange={(e) => { setFactors({ ...factors, 7: e.target.checked }); }}
                            />
                            7
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={factors[8]}
                                onChange={(e) => { setFactors({ ...factors, 8: e.target.checked }); }}
                            />
                            8
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={factors[9]}
                                onChange={(e) => { setFactors({ ...factors, 9: e.target.checked }); }}
                            />
                            9
                        </label>
                <br/>
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