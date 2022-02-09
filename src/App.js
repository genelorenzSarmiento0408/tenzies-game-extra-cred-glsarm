import { useState, useEffect } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Opening from "./components/Opening";
import Main from "./components/Main";
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

  const [seconds, setSeconds] = useState(
    parseInt(localStorage.getItem("score")) || 0,
  );

  const [score, setScore] = useState(0);
  useEffect(() => {
    let interval = null;
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
      if (!tenzies) {
        interval = setInterval(() => {
          setSeconds((oldSeconds) => oldSeconds + 1);
        }, 1000);
      }
      if (tenzies) {
        clearInterval(interval);
        setScore((oldScore) => oldScore + 10000 / (seconds + moves));
        localStorage.setItem("score", JSON.stringify(Math.ceil(score)));
      }
    }
    if (!start) {
      clearInterval(interval);
      reStart();
    }
    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dice, start, tenzies]);

  function reStart() {
    localStorage.clear();
    setMoves(-1);
    setTenzies(false);
    setSeconds(0);
    setDice((oldDice) => oldDice.map(() => generateNewDie()));
  }

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
      // if not yet tenzies
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        }),
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setMoves(-1);
      setSeconds(0);
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
            <Main
              moves={moves}
              die={die}
              rollDice={rollDice}
              tenzies={tenzies}
              handleClick={() => setStart(false)}
              seconds={seconds}
              score={score}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
