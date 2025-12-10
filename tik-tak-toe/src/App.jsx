import './App.css'
import { useState } from 'react';

function Square({ value, squareClick }) {

  return (
  <button className="square" onClick={squareClick}>
    {value}
  </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([Array(9).fill(null)]);
  
  function handleClick(i) {
    if (squares[i] || testForWin(squares)) return;

    const nextSquares = squares.slice();
    if (xIsNext) nextSquares[i] = 'X';
    else nextSquares[i] = 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    history.push(nextSquares);
  }

  function undoMove() {
    if (history.length < 2) return;

    history.pop();
    setSquares(history[history.length - 1]);
    setXIsNext(!xIsNext);
  }

  function returnTo(moveIndex) {
    const newHistory = history.slice(0, moveIndex + 1);
    setHistory(newHistory)
    setSquares(history[moveIndex]);
    setXIsNext((moveIndex % 2 == 0) ? true : false );
  }

  const historyNavigator = history.map((stateArray, moveIndex) => {
    let text = (moveIndex == 0) ? 'New game' : `Move ${moveIndex}`;
    return(<button key={moveIndex} onClick={() => returnTo(moveIndex)}>{text}</button>)
  })

  const winner = testForWin(squares);
  let status;
  if (winner) status = `Winner: ${winner}`;
  else if (history.length > 9) status = 'Tie';
  else status = `Next player: ${ xIsNext ? 'X': 'O' }`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="doublePanel">
        <div className="board">
          <Square value={squares[0]} squareClick={() => handleClick(0)}/>
          <Square value={squares[1]} squareClick={() => handleClick(1)}/>
          <Square value={squares[2]} squareClick={() => handleClick(2)}/>
          <Square value={squares[3]} squareClick={() => handleClick(3)}/>
          <Square value={squares[4]} squareClick={() => handleClick(4)}/>
          <Square value={squares[5]} squareClick={() => handleClick(5)}/>
          <Square value={squares[6]} squareClick={() => handleClick(6)}/>
          <Square value={squares[7]} squareClick={() => handleClick(7)}/>
          <Square value={squares[8]} squareClick={() => handleClick(8)}/>
        </div>
        <div className='historyNavigator'>
          {historyNavigator}
        </div>
      </div>
      <button className="undo" onClick={ undoMove }><img  src="../undo.png"/>undo</button>
    </>
  );
}

function testForWin(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines){
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}