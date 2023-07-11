import React, { useState, useEffect, useContext } from 'react';
import './CalculationGame.css'; // Import the CSS file
import GameHistory from './GameHistory'; // Import the GameHistory component
import GameInfo from './GameInfo'; // Import the GameInfo component
import GameOptionsContext from './GameOptionsContext';
import { animated, useSpring } from '@react-spring/web'
import GameResults from './GameResults';

function generateRandomNumber(maxDigits, activeFactors) {

    let digits = Math.floor(Math.random() * maxDigits) + 1;

    let chosenFactor = "";
    while (chosenFactor.length < digits) {
        chosenFactor += activeFactors[Math.floor(Math.random() * activeFactors.length)];
    }
    return Number(chosenFactor);
}

function getOperationMultiplier(operation) {
    switch (operation) {
        case '+':
            return 1;
        case '-':
            return 1.25;
        case '*':
            return 2;
        case '/':
            return 2;
        default:
            break;
    }
}

const generateQuestion = (operators, numberOfDigitsInCalculation, factors) => {
    const activeOperators = Object.keys(operators).filter(key => operators[key] === true);
    const activeOperatorSymbols = activeOperators.map(operatorKey => operatorSymbols[operatorKey]);
    const numberOfDigitsTarget = Math.floor(Math.random() * 2) + 1;

    const activeFactors = Object.keys(factors).filter(key => factors[key] === true);


    let firstRandomNumber = 0;
    let secondRandomNumber = 0;
    if (numberOfDigitsTarget === 1) {
        firstRandomNumber = generateRandomNumber(numberOfDigitsInCalculation, activeFactors);
        secondRandomNumber = generateRandomNumber(numberOfDigitsInCalculation, activeFactors);
    }
    else {
        firstRandomNumber = generateRandomNumber(numberOfDigitsInCalculation, activeFactors);
        secondRandomNumber = generateRandomNumber(numberOfDigitsInCalculation, activeFactors);
    }
    const a = firstRandomNumber;
    const b = secondRandomNumber;

    let chosenOperator = activeOperatorSymbols[Math.floor(Math.random() * activeOperatorSymbols.length)];
    const question = a + chosenOperator + b;
    const questionPrompt = "What is: " + question + "?";
    let answer;
    switch (chosenOperator) {
        case '+':
            answer = a + b;
            break;
        case '-':
            answer = a - b;
            break;
        case '*':
            answer = a * b;
            break;
        case '/':
            answer = a / b;
            break;
        default:
            break;
    }
    return { a, b, operator: chosenOperator, answer, question, questionPrompt };
};

const operatorSymbols = {
    addition: '+',
    subtraction: '-',
    multiplication: '*',
    division: '/'
};

const CalculationGame = () => {
    const {operators, availableTime, numberOfDigitsInCalculation, setOptionsVisible, factors } = useContext(GameOptionsContext);
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timeLimit, setTimeLimit] = useState(availableTime);
    const [gameHistory, setGameHistory] = useState([]);
    const [questionsAnsweredCorrectly, setQuestionsAnsweredCorrectly] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [isCorrect, setIsCorrect] = useState(true);
    const [buttonText, setButtonText] = useState("Submit");
    const [isShowingGameResult, setIsShowingGameResult] = useState(false);

    const btnSpring = useSpring({
        transform: isCorrect ? 'scale(1.2)' : 'scale(1)',
        config: {
            tension: 200,
            friction: 10,
        },
        
    });

    useEffect(() => {
        let timer;
        let timeout;
        if (isPlaying) {
            timer = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
            }, 1000);
            timeout = setTimeout(handleSubmit, timeLimit * 1000);
        } else {
            clearInterval(timer);
            clearTimeout(timeout);
        }
        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying, question, timeLimit]);

    const checkAnswer = (userAnswer, operation, number1, number2) => {
        let correctAnswer;
        if (userAnswer === '') {
            return false;
        }
        switch (operation) {
            case '+':
                correctAnswer = Math.round(number1 + number2);
                userAnswer = Math.round(userAnswer);
                break;
            case '-':
                correctAnswer = Math.round(number1 - number2);
                userAnswer = Math.round(userAnswer);
                break;
            case '*':
                correctAnswer = Math.round(number1 * number2);
                userAnswer = Math.round(userAnswer);
                break;
            case '/':
                // Round the correct answer to 2 decimal places
                correctAnswer = Math.round((number1 / number2) * 100) / 100;
                // Round the user's answer to 2 decimal places
                userAnswer = Math.round(userAnswer * 100) / 100;
                break;
            default:
                return;
        }

        const timeTaken = Date.now() - startTime;
        if (userAnswer === correctAnswer) {
            let numberLengthInCalculation = number1.toString().length + number2.toString().length;
            let operationMultiplier = getOperationMultiplier(operation);

            const pointsEarned = Math.max((10 - (timeTaken / 1000)) * operationMultiplier * numberLengthInCalculation, 1);
            setScore(score + pointsEarned);
            setQuestionsAnsweredCorrectly(questionsAnsweredCorrectly + 1);
            return true;
        } else {
            return false;
        }
    };


    const startGame = () => {
        const question = generateQuestion(operators, numberOfDigitsInCalculation, factors);
        setTimeLimit(availableTime);
        setQuestion(question);
        setIsPlaying(true);
        setOptionsVisible(false);
        setStartTime(Date.now());
        setElapsedTime(0);
        setScore(0);
        setQuestionsAnsweredCorrectly(0);
        setTotalTime(0);
    };

    const increaseTotalTime = () => {
        const timeTaken = Date.now() - startTime;
        setTotalTime(totalTime + timeTaken);
    }

    const userStopGameAction = () => {
        increaseTotalTime();
        stopGame();
    };

    const continueFromResults = () => {
        setIsShowingGameResult(false);
        setOptionsVisible(true);
    };

    const stopGame = () => {
        setIsPlaying(false);
        setIsShowingGameResult(true);
        setGameHistory([
            ...gameHistory,
            { score: score, questions: questionsAnsweredCorrectly, time: elapsedTime, totalTime: totalTime, correctAnswer: question.answer, lastQuestion: question.questionPrompt, lastAnswer: answer, gameNumber: gameHistory.length + 1 }
        ]);
    };

    const handleSubmit = () => {
        if (isPlaying) {
            increaseTotalTime();

            if (elapsedTime < timeLimit) {
                // Validate the answer and calculate score
                if (!checkAnswer(answer, question.operator, question.a, question.b)) {
                    stopGame();
                }
                else {
                    setIsCorrect(true);
                    setButtonText("Correct!");
                    setTimeout(() => setButtonText("Submit"), 1000);
                    setTimeout(() => {
                        setIsCorrect(false);
                    }, 200);
                }
            }
            else {
                stopGame();
            }

            // Generate new question and reset timer
            setQuestion(generateQuestion(operators, numberOfDigitsInCalculation, factors));
            setStartTime(Date.now());
            setElapsedTime(0);
            setAnswer('');
        }
    };

    const timeRemainingInfo = timeLimit - elapsedTime;
    const progressBarWidth = ((timeRemainingInfo) / timeLimit) * 100;
    const isAnyOperatorActive = Object.values(operators).some(value => value);

    return (
        <div>
            {!isPlaying && !isShowingGameResult ? (
                <button className="start-game-button" disabled={!isAnyOperatorActive || numberOfDigitsInCalculation === '0'} onClick={startGame}>Start Game</button>
            ) : (<div />)}
            {isPlaying ? (
                <div>
                    <GameInfo score={score} timeRemaining={timeRemainingInfo} progressBarWidth={progressBarWidth} />
                    <div className="qustion-prompt">{question.questionPrompt}</div>
                    <input
                        className="input-textbox"
                        type="number"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSubmit();
                            }
                        }}
                    />
                    <br />
                    <animated.button style={btnSpring} className="submit-button" onClick={handleSubmit}>
                        {buttonText}
                    </animated.button>
                    <br />
                    <button className="stop-game-button" onClick={userStopGameAction}>End Game</button>
                </div>
            ) : (<div />) }
            {isShowingGameResult ?
                (<div >
                    <GameResults
                        lastQuestion={gameHistory[gameHistory.length - 1].lastQuestion}
                        correctAnswer={gameHistory[gameHistory.length - 1].correctAnswer }
                        lastAnswer={gameHistory[gameHistory.length - 1].lastAnswer}
                        score={gameHistory[gameHistory.length - 1].score}
                    />
                    <animated.button style={btnSpring} className="submit-button" onClick={continueFromResults}>
                        Continue
                    </animated.button>
                </div>)
                :
                (<div/>)}
            {gameHistory.length > 0 && !isShowingGameResult && !isPlaying && <GameHistory history={gameHistory} />}
        </div>
    );
};

export default CalculationGame;