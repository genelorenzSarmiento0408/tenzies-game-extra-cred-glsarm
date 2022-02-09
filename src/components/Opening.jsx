export default function Opening({ handleClick }) {
  return (
    <div className="opening--container">
      <h2 className="title">Capstone Project: Tenzies</h2>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <p className="instructions">
        This is a capstone project for Learn React from Scrimba
      </p>
      <button className="button" onClick={handleClick}>
        Start Game
      </button>
    </div>
  );
}
