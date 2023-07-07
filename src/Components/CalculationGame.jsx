import React, { useState, useEffect, useContext } from 'react';
import './CalculationGame.css'; // Import the CSS file
import GameHistory from './GameHistory'; // Import the GameHistory component
import GameInfo from './GameInfo'; // Import the GameInfo component
import GameOptionsContext from './GameOptionsContext';

function generateRandomNumber(maxDigits) {
    const maxNumber = Math.pow(10, maxDigits) - 1;
    return Math.floor(Math.random() * maxNumber) + 1;
}

const generateQuestion = (operators, numberOfDigitsInCalculation) => {
    const activeOperators = Object.keys(operators).filter(key => operators[key] === true);
    const activeOperatorSymbols = activeOperators.map(operatorKey => operatorSymbols[operatorKey]);
    const numberOfDigitsTarget = Math.floor(Math.random() * 2) + 1;

    let firstRandomNumber = 0;
    let secondRandomNumber = 0;
    if (numberOfDigitsTarget === 1) {
        firstRandomNumber = generateRandomNumber(numberOfDigitsInCalculation);
        secondRandomNumber = generateRandomNumber(1);
    }
    else {
        firstRandomNumber = generateRandomNumber(1);
        secondRandomNumber = generateRandomNumber(numberOfDigitsInCalculation);
    }
    const a = firstRandomNumber;
    const b = secondRandomNumber;

    let chosenOperator = activeOperatorSymbols[Math.floor(Math.random() * activeOperatorSymbols.length)];
    const question = a + chosenOperator + b;
    const questionPrompt = "What is: " + question + "?";
    console.log(questionPrompt);
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
    const { operators, availableTime, numberOfDigitsInCalculation, setOptionsVisible } = useContext(GameOptionsContext);
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
    }, [isPlaying, question]);

    const checkAnswer = (userAnswer, operation, number1, number2) => {
        let correctAnswer;

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
        console.log("User answer:", userAnswer, " correct answer:", correctAnswer);
        if (userAnswer === correctAnswer) {
            const pointsEarned = Math.max(10 - timeTaken / 1000, 1);
            setScore(score + pointsEarned);
            setQuestionsAnsweredCorrectly(questionsAnsweredCorrectly + 1);
            return true;
        } else {
            setScore(score - 1);
            return false;
        }
    };


    const startGame = () => {
        const question = generateQuestion(operators, numberOfDigitsInCalculation);
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
        console.log("totaltime:", totalTime)

    }

    const userStopGameAction = () => {
        increaseTotalTime();
        stopGame();
    };

    const stopGame = () => {
        setIsPlaying(false);
        setOptionsVisible(true);
        setGameHistory([
            ...gameHistory,
            { score: score, questions: questionsAnsweredCorrectly, time: elapsedTime, totalTime: totalTime, correctAnswer: question.answer, lastQuestion: question.questionPrompt, lastAnswer: answer }
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
            }
            else {
                stopGame();
            }

            // Generate new question and reset timer
            setQuestion(generateQuestion(operators, numberOfDigitsInCalculation));
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
            {!isPlaying ? (

                <button className="start-game-button" disabled={!isAnyOperatorActive || numberOfDigitsInCalculation === '0'} onClick={startGame}>Start Game</button>
            ) : (
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
                    <button className="submit-button" onClick={handleSubmit}>Submit</button>
                    <br />
                        <button className="stop-game-button" onClick={userStopGameAction}>Stop Game</button>
                </div>
            )}
            {gameHistory.length > 0 && !isPlaying && <GameHistory history={gameHistory} />}
        </div>
    );
};

export default CalculationGame;