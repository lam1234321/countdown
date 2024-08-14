// This would be stored in the 'src' folder of the GitHub repository
// whack-a-mole.js
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const WhackAMole = ({ assetsUrl }) => {
    const [score, setScore] = useState(0);
    const [activeMole, setActiveMole] = useState(null);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveMole(Math.floor(Math.random() * 9));
      }, 1000);

      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
        clearInterval(timerInterval);
      };
    }, []);

    useEffect(() => {
      if (timer === 0) {
        // Game over
        alert(`Game over! Your score is ${score}`);
      }
    }, [timer, score]);

    const whackMole = (index) => {
      if (index === activeMole) {
        setScore(score + 1);
        setActiveMole(null);
      }
    };

    return React.createElement(
      'div',
      { className: "whack-a-mole" },
      React.createElement('h2', null, "Whack-a-Mole"),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement('p', null, `Time: ${timer}`),
      React.createElement(
        'div',
        { className: "game-board" },
        Array(9).fill().map((_, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: `mole ${index === activeMole ? 'active' : ''}`,
              onClick: () => whackMole(index)
            },
            index === activeMole && React.createElement('img', { src: `${assetsUrl}/mole.png`, alt: "Mole" })
          )
        )
      )
    );
  };

  return () => React.createElement(WhackAMole, { assetsUrl: assetsUrl });
};

console.log('Whack-a-Mole game script loaded');
