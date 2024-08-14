import React, { useState, useEffect } from 'react';

const GameApp = () => {
  // Whack-a-Mole state
  const [whackScore, setWhackScore] = useState(0);
  const [whackActiveMole, setWhackActiveMole] = useState(null);

  // Countdown game state
  const [countdownValue, setCountdownValue] = useState(10);
  const [countdownRandomNumber, setCountdownRandomNumber] = useState(0);
  const [countdownIsRunning, setCountdownIsRunning] = useState(false);

  // Whack-a-Mole game logic
  useEffect(() => {
    const interval = setInterval(() => {
      setWhackActiveMole(Math.floor(Math.random() * 9));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const whackMole = (index) => {
    if (index === whackActiveMole) {
      setWhackScore(whackScore + 1);
      setWhackActiveMole(null);
    }
  };

  // Countdown game logic
  useEffect(() => {
    let interval;
    if (countdownIsRunning) {
      interval = setInterval(() => {
        setCountdownValue((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdownIsRunning]);

  useEffect(() => {
    if (countdownValue === 0) {
      setCountdownIsRunning(false);
    }
  }, [countdownValue]);

  useEffect(() => {
    setCountdownRandomNumber(Math.floor(Math.random() * 9) + 1);
  }, [countdownIsRunning]);

  const handleCountdownStart = () => {
    setCountdownIsRunning(true);
  };

  const handleCountdownPause = () => {
    setCountdownIsRunning(false);
  };

  const handleCountdownReset = () => {
    setCountdownValue(10);
    setCountdownIsRunning(false);
  };

  return (
    <div className="game-app">
      {/* Whack-a-Mole */}
      <div className="whack-a-mole">
        <h2>Whack-a-Mole</h2>
        <p>Score: {whackScore}</p>
        <div className="game-board">
          {Array(9).fill().map((_, index) => (
            <div
              key={index}
              className={`mole ${index === whackActiveMole ? 'active' : ''}`}
              onClick={() => whackMole(index)}
            >
              {index === whackActiveMole && (
                <img src="/mole.png" alt="Mole" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Countdown Game */}
      <div className="countdown-game">
        <h2>Countdown Game</h2>
        <p>Countdown: {countdownValue}</p>
        <p>Random Number: {countdownRandomNumber}</p>
        <div>
          <button onClick={handleCountdownStart}>Start</button>
          <button onClick={handleCountdownPause}>Pause</button>
          <button onClick={handleCountdownReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default GameApp;
