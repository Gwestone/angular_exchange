import React, {useEffect, useState} from 'react';
import './GameComponent.css';
import {Difficulty} from "../../types";

function GameComponent(props: {difficulty: Difficulty}) {

    const [totalCount, setTotalCount] = useState<number>(25);
    const [humanCount, setHumanCount] = useState<number>(0);
    const [aiCount, setAiCount] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(false);

    const [currentMove, setCurrentMove] = useState<"AI" | "Human">((props.difficulty) === "HARD" ? "AI" : "Human")

    //human logic
    function addMatchesHuman(count: number){
        if (count <= totalCount){
            setTotalCount(totalCount - count);
            setHumanCount(humanCount + count);
            setCurrentMove("AI");
        }
    }

    //ai logic
    function addMatchesAI(count: number){
        if (count <= totalCount){
            setTotalCount(totalCount - count);
            setAiCount(aiCount + count);
            setCurrentMove("Human");
        }
    }

    useEffect(()=>{
        if (currentMove === "AI"){
            setTimeout(()=>{
                setLoading(true);
                aiMove();
                setLoading(false);
            }, 1500);
        }
        // eslint-disable-next-line
    }, [currentMove])

    function aiMove(){
        if (totalCount === 25){
            addMatchesAI(1);
            return;
        }
        if (totalCount > 4){
            const remainder = totalCount % 4;
            if (remainder === 0){
                addMatchesAI(3);
                console.log("wrong");
                return;
            }
            if (remainder === 1) {
                addMatchesAI(1);
                return;
            }
            if (remainder === 2) {
                addMatchesAI(2);
                return;
            }
            if (remainder === 3) {
                addMatchesAI(3);
                return;
            }
        }else {
            if (aiCount % 2 !== 0){
                if (totalCount >= 3){
                    addMatchesAI(3);
                }else {
                    addMatchesAI(1);
                }
                return;
            }else {
                addMatchesAI(2);
                return;
            }
        }

    }

    //win logic
    useEffect(()=>{
        if (totalCount === 0){
            if (aiCount % 2 === 0)
                alert("Ai won");
            else if(humanCount % 2 === 0)
                alert("Human won");
        }
    }, [aiCount, humanCount, totalCount])

    //utility
    function generateMatches(count: number){
        let arr = [];
        for (let i = 0; i < count; i++) {
            arr.push(<div key={i} />);
        }
        return arr;
    }

    function generateFadeClass(count: number){
        return ((totalCount < count || (currentMove !== "Human")) ? "fade" : "");
    }

  return (
      <div className={(loading) ? "fade" : ""}>
          <div className={"game_title"}>Matches left:  <br/>{totalCount}</div>
          <div className={"blocks"}>
              <div className={"base"}>
                  <div className={"mainScreen"}>{generateMatches(totalCount)} </div>
                  <div className={"controls"}>
                      <button className={"Control_Button " + generateFadeClass(1)} onClick={()=>{addMatchesHuman(1)}}>+1</button>
                      <button className={"Control_Button " + generateFadeClass(2)} onClick={()=>{addMatchesHuman(2)}}>+2</button>
                      <button className={"Control_Button " + generateFadeClass(3)} onClick={()=>{addMatchesHuman(3)}}>+3</button>
                  </div>
              </div>
              <div className={"base"}>
                  <div className={"label"}>AI</div>
                <div className={"leftScreen"}>{generateMatches(aiCount)}</div>
                <div className={"display"}>{aiCount}</div>
              </div>
              <div className={"base"}>
                  <div className={"label"}>HU</div>
                <div className={"rightScreen"}>{generateMatches(humanCount)}</div>
                  <div className={"display"}>{humanCount}</div>
              </div>
          </div>
          <div className={"current " + ((currentMove !== "AI") ? "current_ai" : "current_human")}>Current move: <br/>{currentMove}</div>
      </div>
  );
}

export default GameComponent;
