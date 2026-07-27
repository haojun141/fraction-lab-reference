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