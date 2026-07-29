import type { Frac } from "../type";
import { compare } from "../lib/fractions";
import { FractionBar } from "./FractionBar";

type Choice = -1| 0 | 1;

interface CompareQuestionProps{
    left: Frac;
    right: Frac;
    onAnswer: (correct: boolean) => void;
}

export function CompareQuestion({left, right, onAnswer}: CompareQuestionProps){
    function handleChoice(choice: Choice){
        onAnswer(compare(left, right) === choice);
    }
    return (
        <div>
            <h2>
                Which is bigger?
            </h2>
            <div className="compare-low">
                <div>
                    <FractionBar segments={left.den} filled={left.num} label={`${left.num} over ${left.den}`}/>
                    <p>{left.num}/{left.den}</p>
                </div>
                <div>
                    <FractionBar segments={right.den} filled={right.num} label={`${right.num} over ${right.den}`}/>
                    <p>{right.num}/{right.den}</p>
                </div>
            </div>
            <button onClick={()=>handleChoice(-1)}>Left is bigger</button>
            <button onClick={()=>handleChoice(0)}>Equal</button>
            <button onClick={()=>handleChoice(1)}>Right is bigger</button>

        </div>
    )
}