import type { Frac, Difficulty, Mode, Question } from "../type";
import { simplify } from "./fractions";
//random integer between min and max, inclusive
function randInt(min: number, max: number): number{
return Math.floor(Math.random()* (max-min + 1))+ min;

}

const DEN_RANGE: Record<Difficulty, {min: number; max: number}> = {
    easy: {min: 2, max: 6},
    medium:{min:2,max: 10},
    hard:{min: 2, max:12},
};


//A random proper fraction: 1<=num<den
function randFrac(difficulty: Difficulty): Frac{
    const {min, max} = DEN_RANGE[difficulty];
    const den = randInt(min, max);
    const num = randInt(1, den - 1);
    return {num, den};
}

export function generateQuestion(mode: Mode, difficulty: Difficulty): Question{
    if (mode === "build"){
        const target = simplify(randFrac(difficulty));
        //sometimes gives a bar split finer than the target(x2), so the student must fill an equivalent amount 
        const finer = Math.random() <= 0.4 && target.den * 2 < DEN_RANGE[difficulty].max;
        const segments = finer ? target.den * 2: target.den;
        return {mode: "build", target, segments}
    }

    if(mode === "compare"){
        const left = randFrac(difficulty);
        let right = randFrac(difficulty);
        while(right.num === left.num && right.den === left.den){
            right = randFrac(difficulty);
        }
        return {mode: "compare", left, right};
    }

    //equivalent - target must be simplifiable, so den <= half of max
    const {max} = DEN_RANGE[difficulty];
    let target = randFrac(difficulty);
    while(target.den * 2 > max){
        target = randFrac(difficulty);
    }
    return {mode: "equivalent", target};
}
export function generateSession(
    mode: Mode,
    difficulty: Difficulty,
    count: number,
):
Question[]{
    return Array.from({length: count},()=>generateQuestion(mode,difficulty)
    )
}