import React, { useState, useEffect } from 'react';

const CountdownGame = () => {
  const [countdown, setCountdown] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    let timer;
    if (isActive) {
      const randomStartingCount = Math.floor(Math.random() * 11) + 10;
      setCountdown(randomStartingCount);
      setRandomNumber(Math.floor(Math.random() * 100));
      timer = setInterval(() => {
        setCountdown((prevCount) => (prevCount - 1));
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isActive]);

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
