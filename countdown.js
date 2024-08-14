// This would be stored in the 'src' folder of the GitHub repository
// countdown-game.js
window.initGame = (React) => {
  const { useState, useEffect } = React;

  const CountdownGame = () => {
    const [countdown, setCountdown] = useState(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      let timer;
      if (isActive) {
        const randomStartingCount = Math.floor(Math.random() * 11) + 10;
        setCountdown(randomStartingCount);
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

    return React.createElement(
      'div',
      { className: "countdown-game" },
      React.createElement('h2', null, "Countdown Game"),
      countdown !== null && (
        <p>
          Time remaining: {countdown}
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
