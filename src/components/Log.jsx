export default function Log({turns}){


    return <ol id="log">
      
      {/* note: in the "Key" in li it is back ticks not single quotes and using $ you can write javaScript */}
        {turns.map(turn=><li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected {turn.square.row},{turn.square.col}</li>)}
        
    </ol>
}