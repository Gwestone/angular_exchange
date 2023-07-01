import {GameAction, GameState} from "../reducers/gameReducer";
import React, {Dispatch, SetStateAction, useEffect} from "react";

export default function useAiHook(state: GameState, dispatch: React.Dispatch<GameAction>, setLoading: Dispatch<SetStateAction<boolean>>){
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
}