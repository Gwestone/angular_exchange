import React, {useState} from 'react';
import './NewGameComponent.css';
import {Difficulty} from "../../types";

function NewGameComponent(props: {onNewGame: (newGame:{mode: string, difficulty: string})=>void}) {

    const [mode, setMode] = useState<"HUMAN" | "AI">("AI");
    const [difficulty, setDifficulty] = useState<Difficulty>("EASY");

  return (
      <>
                <div className="Welcome">Welcome to checkers</div>
                {/*<div className="List">1. Choose mode</div>*/}
                <div className="title">Modes: </div>
                <div className="Modes">
                    <button className={"Button " + ((mode === "AI") ? "Active" : "")} onClick={()=>setMode("AI")}>Ai</button>
                    <button className={"Button " + ((mode === "HUMAN") ? "Active" : "")} onClick={()=>setMode("HUMAN")}>Human</button>
                </div>
                {/*<div className="List">2. Choose difficulty</div>*/}
                <div className={"title " + ((mode !== "AI") ? "fade" : "")}>Difficulties: </div>
                <div className={"Difficulties " + ((mode !== "AI") ? "fade" : "")}>
                    <button className={"Button " + ((difficulty === "EASY") ? "Active" : "")} onClick={()=>setDifficulty("EASY")}>Easy</button>
                    <button className={"Button " + ((difficulty === "HARD") ? "Active" : "")} onClick={()=>setDifficulty("HARD")}>Hard</button>
                </div>
                {/*<div className="List">3. Play</div>*/}
                <div className={"Start " + ((mode !== "AI") ? "fade" : "")} >
                    <button className="Button" onClick={()=>{props.onNewGame({mode, difficulty})}}>Start</button>
                </div>
      </>
  );
}

export default NewGameComponent;
