import type { GameAction, GameState } from "./type";
import { generateSession } from "./lib/generator";

export const QUESTION_PER_SESSION = 3;

export const initialState: GameState = {
    phase: "menu",
    mode: "build",
    difficulty: "easy",
    questions: [],
    current: 0,
    results: [],
    score: 0,
    streak: 0
};

export function gameReducer(state: GameState, action: GameAction): GameState{
if(action.type === "START"){
return{
    ...state,
    phase: "playing",
    mode: action.mode,
    difficulty: action.difficulty,
    questions: generateSession(action.mode, action.difficulty,QUESTION_PER_SESSION
    ),
    current: 0,
    results: [],
    score:0,
    streak: 0,
};
}
if(action.type === "ANSWER")
{
    if(state.phase !== "playing") return state;
    const newStreak = action.correct ? state.streak +1 : 0;
    const bonus = action.correct ? Math.min(newStreak - 1, 5) *2 : 0;
    return {
        ...state,
        phase: "feedback",
        results: [...state.results, action.correct],
        score: action.correct ? state.score +10 +bonus: state.score,
        streak: newStreak,
    };
}
if(action.type === "NEXT"){
    if(state.phase !== "feedback") return state;
    const isLast = state.current + 1 >= state.questions.length;
    return {
        ...state,
        phase: isLast ? "summary": "playing",
        current: isLast ? state.current: state.current +1,
    };
}
if(action.type === "RESTART") {
    return initialState;
}
return state
}