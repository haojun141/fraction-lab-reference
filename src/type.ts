export type Frac ={
    num: number //numerator
    den: number //denominator
};

export type Difficulty = "easy" | "medium" | "hard";
export type Mode = "build" | "compare" | "equivalent";

export type Question = 
{mode: "build"; target: Frac; segments: number}
| {mode: "compare"; left: Frac; right: Frac}
| {mode:"equivalent"; target: Frac};

export type Phase = "menu" | "playing" | "feedback" | "summary"

export interface GameState{
    phase: Phase,
    mode: Mode,
    difficulty: Difficulty,
    questions: Question[],
    current: number,
    results: boolean[], //correct/wrong for each answered question
    score: number,
    streak: number
}

export type GameAction = 
{type: "START", mode: Mode; difficulty: Difficulty}
| {type: "ANSWER", correct: boolean}
| {type: "NEXT"}
| {type: "RESTART"}