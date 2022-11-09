import logo from './logo.svg';
import './App.css';
import { nanoid } from 'nanoid'
import React from 'react'
import Die from './Die'

function App() {
  const [dice, setDice] = React.useState(createDice());
  const [gameOver, setGameOver] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const value = dice[0].value;
    const valueSame = dice.every((die) => die.value === value);

    if (allHeld && valueSame) {
      console.log("You have won");
      setGameOver(true);
    }
  }, [dice]);

  function createDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
      });
    }

    return newDice;
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld
            }
          : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => {
        holdDice(die.id);
      }}
    />
  ));

  function handleClick() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld
          ? die
          : {
              value: Math.floor(Math.random() * 6) + 1,
              isHeld: false,
              id: nanoid()
            };
      })
    );
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={handleClick}>
        {gameOver ? "Reset" : "Roll"}
      </button>
    </main>
  );
}

export default App;
