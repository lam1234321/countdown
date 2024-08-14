// This would be stored in the 'src' folder of the GitHub repository
// countdown-game.js
window.initGame = (React) => {
  const { useState, useEffect } = React;

  const CountdownGame = () => {
    const [countdown, setCountdown] = useState(null);
    const [randomNumber, setRandomNumber] = useState(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      let timer;
      if (isActive) {
        const randomNum = Math.random() * 10;
        setRandomNumber(randomNum.toFixed(2));
        setCountdown(10.0);
        timer = setInterval(() => {
          setCountdown((prevCount) => (prevCount - 0.01).toFixed(2));
        }, 10);
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

    return React.createElement(
      'div',
      { className: "countdown-game" },
      React.createElement('h2', null, "Countdown Game"),
      countdown !== null && randomNumber !== null && (
        <p>
          Time remaining: {countdown}
          <br />
          Random number: {randomNumber}
          {countdown === randomNumber.toFixed(2) ? 'Wow!' : 'Lol'}
        </p>
      ),
      !isActive
        ? React.createElement('button', { onClick: handleStart }, "Start")
        : React.createElement('button', { onClick: handleStop }, "Stop")
    );
  };

  return () => React.createElement(CountdownGame, {});
};

console.log('Countdown game script loaded');
