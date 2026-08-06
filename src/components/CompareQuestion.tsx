import type { Frac } from "../type";
import { compare } from "../lib/fractions";
import { FractionBar } from "./FractionBar";
import { buttonBase } from "../lib/styles";

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
        <div className="compare-question bg-white border-[3px] border-ink rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-2">
                Which is bigger?
            </h2>
            <div className="compare-row flex gap-6 justify-center items-end my-3">
                <div className="compare-side flex flex-col items-center flex-1 min-w-0">
                    <FractionBar segments={left.den} filled={left.num} label={`${left.num} over ${left.den}`}/>
                    <p className="compare-fraction font-bold text-lg mt-1.5">{left.num}/{left.den}</p>
                </div>
                <div className="compare-side flex flex-col items-center flex-1 min-w-0">
                    <FractionBar segments={right.den} filled={right.num} label={`${right.num} over ${right.den}`}/>
                    <p className="compare-fraction font-bold text-lg mt-1.5">{right.num}/{right.den}</p>
                </div>
            </div>
            <div className="flex justify-center flex-wrap">
                <button className={buttonBase} onClick={()=>handleChoice(1)}>Left is bigger</button>
                <button className={buttonBase} onClick={()=>handleChoice(0)}>Equal</button>
                <button className={buttonBase} onClick={()=>handleChoice(-1)}>Right is bigger</button>
            </div>
        </div>
    )
}