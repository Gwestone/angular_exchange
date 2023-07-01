import React, {useEffect, useReducer, useState} from 'react';
import './GameComponent.css';
import {Difficulty} from "../../types";
import {gameReducer} from "../../reducers/gameReducer";

function GameComponent(props: {difficulty: Difficulty}) {

    const [loading, setLoading] = useState<boolean>(false);

    const [state, dispatch] = useReducer(gameReducer, {totalCount: 25, aiCount: 0, humanCount: 0, currentMove: (props.difficulty) === "HARD" ? "AI" : "Human"})

    //human logic
    function addMatchesHuman(count: number){
        dispatch({type: "add_human", amount: count});
    }

    useEffect(()=>{
        if (state.currentMove === "AI"){
            setTimeout(()=>{
                setLoading(true);
                aiMove();
                setLoading(false);
            }, 1500);
        }
        // eslint-disable-next-line
    }, [state])

    function aiMove(){
        if (state.totalCount === 25){
            dispatch({type: "add_ai", amount: 1});
            return;
        }
        if (state.totalCount > 4){
            const remainder = state.totalCount % 4;
            if (remainder === 0){
                dispatch({type: "add_ai", amount: 3});
                return;
            }
            if (remainder === 1) {
                dispatch({type: "add_ai", amount: 1});
                return;
            }
            if (remainder === 2) {
                dispatch({type: "add_ai", amount: 1});
                return;
            }
            if (remainder === 3) {
                dispatch({type: "add_ai", amount: 3});
                return;
            }
        }else {
            if (state.aiCount % 2 !== 0){
                if (state.totalCount >= 3){
                    dispatch({type: "add_ai", amount: 3});
                }else {
                    dispatch({type: "add_ai", amount: 1});
                }
                return;
            }else {
                dispatch({type: "add_ai", amount: 1});
                return;
            }
        }

    }

    //win logic
    useEffect(()=>{
        if (state.totalCount === 0){
            if (state.aiCount % 2 === 0)
                alert("Ai won");
            else if(state.humanCount % 2 === 0)
                alert("Human won");
        }
    }, [state])

    //utility
    function generateMatches(count: number){
        let arr = [];
        for (let i = 0; i < count; i++) {
            arr.push(<div key={i} />);
        }
        return arr;
    }

    function generateFadeClass(count: number){
        return ((state.totalCount < count || (state.currentMove !== "Human")) ? "fade" : "");
    }

  return (
      <div className={(loading) ? "fade" : ""}>
          <div className={"game_title"}>Matches left:  <br/>{state.totalCount}</div>
          <div className={"blocks"}>
              <div className={"base"}>
                  <div className={"mainScreen"}>{generateMatches(state.totalCount)} </div>
                  <div className={"controls"}>
                      <button className={"Control_Button " + generateFadeClass(1)} onClick={()=>{addMatchesHuman(1)}}>+1</button>
                      <button className={"Control_Button " + generateFadeClass(2)} onClick={()=>{addMatchesHuman(2)}}>+2</button>
                      <button className={"Control_Button " + generateFadeClass(3)} onClick={()=>{addMatchesHuman(3)}}>+3</button>
                  </div>
              </div>
              <div className={"base"}>
                  <div className={"label"}>AI</div>
                <div className={"leftScreen"}>{generateMatches(state.aiCount)}</div>
                <div className={"display"}>{state.aiCount}</div>
              </div>
              <div className={"base"}>
                  <div className={"label"}>HU</div>
                <div className={"rightScreen"}>{generateMatches(state.humanCount)}</div>
                  <div className={"display"}>{state.humanCount}</div>
              </div>
          </div>
          <div className={"current " + ((state.currentMove !== "AI") ? "current_ai" : "current_human")}>Current move: <br/>{state.currentMove}</div>
      </div>
  );
}

export default GameComponent;
