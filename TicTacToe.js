import React, { useState } from 'react';
import './App.css';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);
  const currentPlayer = xIsNext ? 'X' : 'O';

  const handleClick = (index) => {
    if (squares[index] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[index] = currentPlayer;
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <Board squares={squares} onClick={handleClick} winner={winner} />
      <div className="status">
        {winner ? `Winner: ${winner}` : squares.every(square => square) ? "It's a draw!" : `Next Player: ${currentPlayer}`}
      </div>
      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

function Board({ squares, onClick, winner }) {
  const winningCombination = calculateWinner(squares, true);

  const renderSquare = (index) => {
    const isWinningSquare = winningCombination && winningCombination.includes(index);
    return (
      <button
        className={`square ${isWinningSquare ? 'winning' : ''}`}
        onClick={() => onClick(index)}
      >
        {squares[index]}
      </button>
    );
  };

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

// Helper function to determine if there's a winner
function calculateWinner(squares, returnCombination = false) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return returnCombination ? combination : squares[a];
    }
  }
  return returnCombination ? null : null;
}

export default App;
