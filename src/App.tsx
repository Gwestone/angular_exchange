import React, {useState} from 'react';
import './App.css';
import NewGameComponent from "./components/NewGame/NewGameComponent";
import {Difficulty} from "./types";
import GameComponent from "./components/Game/GameComponent";

function App() {

    const [gameStarted, setGameStarted] = useState(false);
    const [gameDifficulty, setGameDifficulty] = useState<Difficulty>("EASY");

  return (
    <div className="Background">
        <div className="App">
            <div className="Card">
                {
                    !gameStarted ? <NewGameComponent onNewGame={({difficulty})=>{
                        setGameDifficulty(difficulty as Difficulty);
                        setGameStarted(true)
                    }}/> :
                        <GameComponent difficulty={gameDifficulty} />
                }
            </div>
        </div>
    </div>
  );
}

export default App;
