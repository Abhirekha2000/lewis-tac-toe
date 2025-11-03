import { useState } from "react";
import Square from "./Square.jsx";
import { calculateWinner, isDraw } from "../game/logic.js";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    // block clicks if square filled OR game already finished
    if (squares[i] || calculateWinner(squares) || isDraw(squares)) return;

    const next = squares.slice();           // immutable update
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw(squares)) {
    status = "Draw";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  const renderSquare = (i) => (
    <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
  );

  return (
    <div className="board">
      <div className="status" aria-live="polite">{status}</div>
      <div className="row">{[0,1,2].map(renderSquare)}</div>
      <div className="row">{[3,4,5].map(renderSquare)}</div>
      <div className="row">{[6,7,8].map(renderSquare)}</div>
      <button className="reset" onClick={reset}>Reset</button>
    </div>
  );
}
