  //Note: this code has been moved to APP.jsx
// const initialGameBoard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null]
// ];

export default function GameBoard({onSelectSqaure,board}) {
   
  //Note: this code has been moved to APP.jsx
  //  let gameBoard = initialGameBoard;
  
  //  //this process is called deriving state from props wherein you get the state of those values form the already precomputed states via props and thus not using any additional states to manage them
  //  for(const turn of turns){
  //     const {square,player} = turn;
  //     const {row,col} = square;

  //     gameBoard[row][col] = player;
  //  }

   //Note: This useState has been uplifted to App.js ans is named gameTurn useState
    // const [gameBoard,setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex,colIndex){
          
    //     setGameBoard((prevBoard)=>{

    //         //now as arrays are passed through reference directly changing them would result in some prewoblems
    //         //so create a deep copy of the array ans then return that 
    //         const updatedBoard = [...prevBoard.map(innerArray =>[...innerArray])];

    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });
         
    //     //this is called Lifting state up and the funtion handleSelectSquare is written in App.js
    //     onSelectSqaure();

    // }
  return (
    <>
      <ol id="game-board">
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                    {/* for passing arguments through onClick use the syntax */}
                  <button onClick={()=>onSelectSqaure(rowIndex,colIndex)} disabled={playerSymbol!==null}>{playerSymbol}</button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}
