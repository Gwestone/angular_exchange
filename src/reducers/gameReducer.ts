import {Reducer} from "react";

type Turn = "AI" | "Human";

type GameState = {
    aiCount: number
    humanCount: number;
    totalCount: number;
    currentMove: Turn;
}

type GameAction =
    | { type: 'add_human', amount: number }
    | { type: 'add_ai', amount: number };


export const gameReducer: Reducer<GameState, GameAction> = (prevState, action): GameState => {
    switch (action.type){
        case "add_human":
            if (action.amount <= prevState.totalCount && prevState.currentMove === "Human"){
                return {
                    ...prevState,
                    humanCount: prevState.humanCount + action.amount,
                    totalCount: prevState.totalCount - action.amount,
                    currentMove: "AI"
                }
            }
            break
        case "add_ai":
            if (action.amount <= prevState.totalCount && prevState.currentMove === "AI"){
                return {
                    ...prevState,
                    aiCount: prevState.aiCount + action.amount,
                    totalCount: prevState.totalCount - action.amount,
                    currentMove: "Human"
                }
            }
            break
    }
    return prevState;
}