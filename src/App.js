import { useState } from "react";

function Square({ value, onSquareClick }) {
  return <button onClick={onSquareClick} className="square">{value}</button>;
}

function Board({ xIsNext, squares, onPlay }) {

  const winner = calculateWinner(squares);

  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';

    onPlay(nextSquares);
  }

  // let filas = [];
  // let cuadros;

  // for(let fila = 0; fila < 3; fila++) {
    
  //   cuadros = [];
    
  //   for(let i = 0; i < 3; i++) {
  //     cuadros.push(
  //       <Square
  //         key={i}
  //         value={squares[i + fila * 3]}
  //         onSquareClick={() => handleClick(i + fila * 3)}
  //       />
  //     );
  //   }

  //   filas.push(
  //     <div key={fila} className="board-row">
  //       {cuadros}
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="status">{status}</div>
      {[0, 3, 6].map(fila => <div key={fila} className="board-row">
        {[0 + fila, 1 + fila, 2 + fila].map(i => <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />)}
      </div>)}

      {/* {filas} */}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    const id = move;

    return (
      <li key={id}>
        {currentMove === move ?
          <div>You are at move #{move}</div> :
          <button onClick={() => jumpTo(move)}>{description}</button>}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const line of lines) {
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}