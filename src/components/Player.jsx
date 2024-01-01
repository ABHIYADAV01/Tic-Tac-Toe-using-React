import { useState } from "react";

export default function Player({initialName,symbol,isActive,onChangeName}){

    const [playName,setPlayerName] = useState(initialName);
    const [isEditing,setIsEditing] = useState(false);
     
    function handleClick(){
        //if you want to toggle the state of the useState variable always pass it through a function and then toggle it is the best practice in react
        setIsEditing((isEditing)=> !isEditing);
        
        if(isEditing){
            onChangeName(symbol,playName);
        }
    }

    function handleChange(event){
      //listening to keyboard strokes getting the values from the keyboard
        setPlayerName(event.target.value);
    }
    let playerName = <span className="player-name" >{playName}</span>;

    if(isEditing){
        playerName = <input type="text" required value={playName} onChange={handleChange} />;
    }

    return(
        <li className={isActive?'active':undefined}>
        <span className="player">
         {playerName}
         
         <span className="palyer-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}>{isEditing?'Save':'Edit'}</button>
        </li>
    );
}