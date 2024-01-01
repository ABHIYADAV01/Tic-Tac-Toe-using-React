import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import {useState} from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurn){

  let currentPlayer = 'X';
  //in implementation of gameTurn array we make sure that the first element of the gameTurn is the latest so if the prev player was "X" then currPlayer is 'O'
  if(gameTurn.length>0 && gameTurn[0].player==='X'){
    currentPlayer='O';
  }

  return currentPlayer;

}



function App() {

  const [players,setPlayers] = useState({
    X:'Player 1',
    O:'Player 2',
  });

  const [gameTurn,setGameTurn] = useState([]);

  // const [activePlayer,setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurn);
 
  //as arrays are passed by reference ,to make sure that no errors occur make deepCopy of those arrays instead, and then operate on them
  let gameBoard = [...initialGameBoard.map((innerArray)=>[...innerArray])];
  
//this process is called deriving state from props wherein you get the state of those values form the already precomputed states via props and thus not using any additional states to manage them
for(const turn of gameTurn){
   const {square,player} = turn;
   const {row,col} = square;

   gameBoard[row][col] = player;
}
  
  let winner;
  for(const combination of WINNING_COMBINATIONS){

    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];
      
      if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
          winner = players[firstSquareSymbol];
      }
    
  }

  const hasDraw = gameTurn.length===9 && !winner;

  function handleSelectSquare(rowIndex,colIndex){

    //setActivePlayer((currActivePlayer)=> currActivePlayer==='X'?'O':'X');

    setGameTurn((prevTurns)=>{
     
      //to get to know who is the current player do not use the activePlayer state as the states may clash
      //insted use a variale
       
      const currentPlayer = deriveActivePlayer(prevTurns);
      
     
     
      //updatedTurns is an array of objects, square is JS object
      //prev state i.e the latest state is appended to front of the array
      const updatedTurns = [{square:{row:rowIndex,col:colIndex},player:currentPlayer},...prevTurns,];

      return updatedTurns

    });
  }

  function handleRestart(){
      setGameTurn([]);
  }

  function handlePlayerNameChange(symbol,newName){
      
    setPlayers(prevPlayers=>{

      return {
        ...prevPlayers,
        //this is the JS syntax to for objects
        [symbol]:newName
      }
    })


  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
        
        <Player initialName="Player1" symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>
        <Player initialName="Player2" symbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayerNameChange}/>

        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSqaure={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurn}/>
    </main>
  );
}

export default App
