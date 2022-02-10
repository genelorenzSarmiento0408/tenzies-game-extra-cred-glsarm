import "../index.css";

export default function Main({
  moves,
  die,
  rollDice,
  tenzies,
  handleClick,
  seconds,
  score,
}) {
  return (
    <div>
      <h1 className="title">Capstone Project: Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{die}</div>
      <div className="score-container">
        <div className="score-text">
          <h1>Moves: {moves}</h1>
        </div>
        <h1>Time: {Math.ceil(seconds)} seconds</h1>
        <h1>
          {localStorage.getItem("score")
            ? `Total Accumulated Score: ${Math.round(score)}`
            : `Previous Score: ${Math.ceil(score)}`}
        </h1>
      </div>
      <div className="button-container">
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "Play Again" : "Roll Dice"}
        </button>
        <button className="reset-button" onClick={handleClick}>
          <p>Restart</p>
        </button>
      </div>
    </div>
  );
}
