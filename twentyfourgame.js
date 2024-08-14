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
      if (result === null) {
        setResult("No Result");
      } else {
        setResult(result);
      }
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
      { className: "twenty-four-game", style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        background:'linear-gradient(to right, #e66465, #9198e5)'
      } },
      React.createElement('h2', { style: { marginBottom: '20px' } }, "24 Game"),
      React.createElement(
        'div',
        { className: "numbers", style: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '20px'
        } },
        numbers.map((num, index) =>
          React.createElement('div', { key: index, className: "number-square", style: {
            display: 'inline-block',
            width: '50px',
            height: '50px',
            lineHeight: '50px',
            textAlign: 'center',
            backgroundColor: '#FFFFFF',
            border: '1px solid #ccc',
            margin: '5px'
          } }, num)
        )
      ),
      React.createElement('p', { style: { marginBottom: '20px' } }, `Target: ${target}`),
      result
        ? React.createElement('p', { style: { marginBottom: '20px' } }, `Result: ${result}`)
        : React.createElement('button', { onClick: handleCalculate, style: {
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px'
        } }, "Calculate"),
      React.createElement('button', { onClick: generateNumbers, style: {
        backgroundColor: '#008CBA',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      } }, "New Game")
    );
  };

  return () => React.createElement(TwentyFourGame, null);
};

console.log('24 game script loaded');
