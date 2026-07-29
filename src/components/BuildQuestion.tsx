import { useState } from "react";
import type { Frac } from "../type";
import { equals } from "../lib/fractions";
import { FractionBar } from "./FractionBar";

interface BuildQuestionProps{
    target: Frac;
    segments: number;
    onAnswer: (correct: boolean)=> void;
}

export function BuildQuestion({target, segments, onAnswer}: BuildQuestionProps){
 const [filled, setFilled] = useState(0);

 function handleSegmentClick(i: number){
    //toggle trick: clicking the last filled segment empties it back to i 
    setFilled(i+1 === filled ? i : i+1);
 }

 function handleSubmit(){
    const studentFraction: Frac = {num: filled, den: segments};
    onAnswer(equals(studentFraction, target));
 }

 return (
    <div>
        <h2>
            Build {target.num}/{target.den}
        </h2>
        <FractionBar
        segments={segments}
        filled={filled}
        onSegmentClick={handleSegmentClick}
        label={`Fraction bar with ${segments} segments, ${filled} filled`}
        />
        <p>
            Your fraction: {filled}/{segments}
        </p>
        <button onClick={handleSubmit}>Submit</button>
    </div>
 )
}