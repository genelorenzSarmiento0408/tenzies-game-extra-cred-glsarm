export default function Opening({ handleClick }) {
  return (
    <div className="opening--container">
      <h2 className="title">Mini Capstone Project: Tenzies</h2>
      <button className="button" onClick={handleClick}>
        Start Game
      </button>
    </div>
  );
}
