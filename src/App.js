import { useState, useEffect } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Opening from "./components/Opening";
function App() {
  const [dice, setDice] = useState(
    JSON.parse(localStorage.getItem("dice")) || allNewDice(),
  );
  const [moves, setMoves] = useState(
    parseInt(localStorage.getItem("moves")) || -1,
  );
  const [start, setStart] = useState(
    JSON.parse(localStorage.getItem("start")) || false,
  );
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }

    setMoves((oldMove) => oldMove + 1);
    if (start) {
      localStorage.setItem("dice", JSON.stringify(dice));
      localStorage.setItem("moves", moves);
      localStorage.setItem("start", start);
    }

    if (!start) {
      localStorage.clear();
      setMoves(-1);
      setTenzies(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dice, start]);
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }
  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        }),
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setMoves(-1);
    }
  }

  function holdDice(id) {
    // set Dice to new array
    setDice((oldDice) =>
      // Map the oldDice then if the id matches the id of the die we are holding
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      }),
    );
  }
  const die = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      holdDice={() => holdDice(die.id)}
      isHeld={die.isHeld}
    />
  ));
  return (
    <div className="App">
      <div className="container">
        {tenzies && <Confetti />}
        {!start ? (
          <Opening handleClick={() => setStart(true)} />
        ) : (
          <>
            <h1 className="title">Mini Capstone Project: Tenzies</h1>
            <p className="instructions">
              Roll until all dice are the same. Click each die to freeze it at
              its current value between rolls.
            </p>
            <div className="dice-container">{die}</div>
            <div className="score-container">
              <div className="score-text">
                <h1>Moves: {moves}</h1>
              </div>
            </div>
            <div className="button-container">
              <button className="roll-dice" onClick={rollDice}>
                {tenzies ? "Play Again" : "Roll Dice"}
              </button>
              <button className="reset-button" onClick={() => setStart(false)}>
                Restart (same dice)
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
