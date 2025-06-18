import React, { useState } from "react";
import Board from "./Board";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = isXTurn ? "X" : "O";
    setSquares(nextSquares);
    setIsXTurn(!isXTurn);
  };

  const winner = calculateWinner(squares);
  let status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXTurn ? "X" : "O"}`;

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <Board squares={squares} onClick={handleClick} />
      <button className="reset" onClick={resetGame}>Restart</button>
    </div>
  );
}

function calculateWinner(sq) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return sq[a];
    }
  }
  return null;
}
