import { useEffect, useState } from "react";

export default function Die({ isHeld, holdDice, value, id }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const [dice5, setDice5] = useState();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
    if (window.innerWidth <= 585) {
      return setDice5(
        <svg
          width="50"
          height="53"
          viewBox="0 0 50 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="5.89867" cy="5.89867" r="5.89867" fill="#2E2E2E" />
          <circle cx="5.89867" cy="47.1013" r="5.89867" fill="#2E2E2E" />
          <circle cx="43.7558" cy="47.1013" r="5.89867" fill="#2E2E2E" />
          <circle cx="43.7558" cy="5.89867" r="5.89867" fill="#2E2E2E" />
          <circle cx="24.9152" cy="26.8522" r="5.89867" fill="#2E2E2E" />
        </svg>,
      );
    }

    return setDice5(
      <svg
        width="84"
        height="100"
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9.97872" cy="9.97872" r="9.97872" fill="#2E2E2E" />
        <circle cx="9.97872" cy="79.6808" r="9.97872" fill="#2E2E2E" />
        <circle cx="74.0213" cy="79.6808" r="9.97872" fill="#2E2E2E" />
        <circle cx="74.0213" cy="9.97872" r="9.97872" fill="#2E2E2E" />
        <circle cx="42.1489" cy="45.4255" r="9.97872" fill="#2E2E2E" />
      </svg>,
    );
  }, [windowSize]);
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };
  let circles = [];

  for (let i = 1; i <= value; i++) {
    circles.push(<div className="circle" key={i}></div>);
  }
  return (
    <div className="die-face" style={styles} onClick={holdDice}>
      <div className={`die-num dice-${value}`}>
        {value === 5 ? <>{dice5}</> : circles}
      </div>
    </div>
  );
}
