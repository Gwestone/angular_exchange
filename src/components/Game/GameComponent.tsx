import React, {useEffect, useState} from 'react';
import './GameComponent.css';
import {Difficulty} from "../../types";

function GameComponent(props: {difficulty: Difficulty}) {

    const [totalCount, setTotalCount] = useState<number>(25);
    const [humanCount, setHumanCount] = useState<number>(0);
    const [aiCount, setAiCount] = useState<number>(0);

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
            if (totalCount <= 6){
                if (totalCount === 6){
                    if (humanCount % 2 === 0){
                        addMatchesAI(2);
                        return;
                    }
                    if (humanCount % 2 !== 0){
                        addMatchesAI(1);
                        return;
                    }
                }
                if (totalCount === 5){
                    if (aiCount % 2 === 0){
                        addMatchesAI(1);
                        return;
                    }else{
                        addMatchesAI(3);
                        return;
                    }
                }
                if (totalCount === 4){
                    if (aiCount % 2 !== 0){
                        addMatchesAI(3);
                        return;
                    }else{
                        addMatchesAI(1);
                        return;
                    }
                }
                if (totalCount === 3){
                    if (aiCount % 2 !== 0){
                        addMatchesAI(3);
                        return;
                    }else{
                        addMatchesAI(2);
                        return;
                    }
                }
                if (totalCount === 2){
                    if (aiCount % 2 !== 0){
                        addMatchesAI(1);
                        return;
                    }else{
                        addMatchesAI(2);
                        return;
                    }
                }
                if (totalCount === 1){
                    addMatchesAI(1);
                    return;
                }

            }else {
                if (totalCount % 2 !== humanCount % 2){
                    addMatchesAI(2);
                    return;
                }else {
                    addMatchesAI(3);
                    return;
                }
            }
        }
        // eslint-disable-next-line
    }, [currentMove])

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
      <>
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
          <div className={"current"}>Current move: <br/>{currentMove}</div>
      </>
  );
}

export default GameComponent;
