import { useState } from "react"
import Log from "./assets/Components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameBoard from "./assets/Components/GameBoard"
import Player from "./assets/Components/Player"
import GameOver from "./assets/Components/GameOver";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {


  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}
function App() {
  const[players,setPlayers] = useState({
        'X' :'Player 1',
        'O' : 'Player 2',
  })
  const [gameTurns, setGameTurns] = useState([])
  //const [hasWinner ,setHasWinner] = useState(false);
  //const [activePlayer,setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);


  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;

  }
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSqareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSqareSymbol = gameBoard[combination[2].row][combination[2].column];
    
    if(firstSquareSymbol && 
      firstSquareSymbol === secondSqareSymbol &&
      firstSquareSymbol === thirdSqareSymbol
      )
      {
         winner = players[firstSquareSymbol];
      }

  }

  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex, colIndex) {

    //setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer }, ...prevTurns];
      return updatedTurns;
    });
  }
    function handleRestart()
    {
      setGameTurns([]);
    }

    function handlePlayerNameChange(symbol,newName)
    {
      setPlayers(prevPlayers =>
        {
          return{
            ...prevPlayers,
            [symbol]:newName
          };
        });
    }
    {

    }


  return (
    <main>

      <div className="heading"><h1>TIC TAC TOE</h1></div>


      <div id="game-container">

        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}
          onChangeName = {handlePlayerNameChange} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}
          onChangeName = {handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && (
        //<GameOver winner= {winner} onRestart={{handleRestart}} />
        <GameOver winner={winner} onRestart={handleRestart} />

        ) }
        <GameBoard onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
