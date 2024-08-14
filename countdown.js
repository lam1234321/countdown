// 24-game.js
window.initGame = (React) => {
  const { useState, useEffect } = React;

  const TwentyFourGame = () => {
    const [numbers, setNumbers] = useState([]);
    const [target, setTarget] = useState(24);
    const [result, setResult] = useState(null);

    useEffect(() => {
      generateNumbers();
    }, []);

    const generateNumbers = () => {
      const newNumbers = [];
      for (let i = 0; i < 4; i++) {
        newNumbers.push(Math.floor(Math.random() * 10) + 1);
      }
      setNumbers(newNumbers);
      setTarget(24);
      setResult(null);
    };

    const handleCalculate = () => {
      const result = calculate(numbers);
      setResult(result);
    };

    const calculate = (nums) => {
      const ops = ['+', '-', '*', '/'];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          for (let k = 0; k < 4; k++) {
            const a = nums[0];
            const b = nums[1];
            const c = nums[2];
            const d = nums[3];
            const exp = `(${a} ${ops[i]} ${b}) ${ops[j]} (${c} ${ops[k]} ${d})`;
            const value = eval(exp);
            if (value === target) {
              return exp;
            }
          }
        }
      }
      return null;
    };

    return React.createElement(
      'div',
      { className: "twenty-four-game" },
      React.createElement('h2', null, "24 Game"),
      React.createElement(
        'div',
        { className: "numbers" },
        numbers.map((num, index) =>
          React.createElement('span', { key: index, className: "number" }, num)
        )
      ),
      React.createElement('p', null, `Target: ${target}`),
      result
        ? React.createElement('p', null, `Result: ${result}`)
        : React.createElement('button', { onClick: handleCalculate }, "Calculate"),
      React.createElement('button', { onClick: generateNumbers }, "New Game")
    );
  };

  return () => React.createElement(TwentyFourGame, null);
};

console.log('24 game script loaded');
