import React, { useState, useEffect } from 'react';

const CountdownGame = () => {
  const [countdown, setCountdown] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const [resultTimer, setResultTimer] = useState(null);

  useEffect(() => {
    let timer;
    let resultTimer;
    if (isActive) {
      const randomStartingCount = Math.floor(Math.random() * 11) + 10;
      setCountdown(randomStartingCount);
      setRandomNumber(Math.floor(Math.random() * 100));
      timer = setInterval(() => {
        setCountdown((prevCount) => (prevCount - 1));
      }, 1000);
    } else {
      clearInterval(timer);
      if (countdown === 0) {
        setResultTimer(5);
        resultTimer = setInterval(() => {
          setResultTimer((prevCount) => (prevCount - 1));
        }, 1000);
      }
    }
    return () => {
      clearInterval(timer);
      clearInterval(resultTimer);
    };
  }, [isActive, countdown]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  return (
    <div className="countdown-game">
      <h2>Countdown Game</h2>
      {countdown !== null && (
        <p>Time remaining: {countdown}</p>
      )}
      {randomNumber !== null && (
        <p>Random number: {randomNumber}</p>
      )}
      {resultTimer !== null && resultTimer > 0 && (
        <p>Result timer: {resultTimer}</p>
      )}
      {!isActive ? (
        <button onClick={handleStart}>Start</button>
      ) : (
        <button onClick={handleStop}>Stop</button>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <CountdownGame />
    </div>
  );
}

export default App;
