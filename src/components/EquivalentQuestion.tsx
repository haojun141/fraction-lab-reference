import { useState } from "react";
import type { Frac } from "../type";
import { equals } from "../lib/fractions";
import { FractionBar } from "./FractionBar";
import { buttonBase } from "../lib/styles";

interface EquivalentQuestionProps {
  target: Frac;
  onAnswer: (correct: boolean) => void;
}

const DENOMINATOR_OPTIONS = [2, 3, 4, 5, 6, 8, 9, 10, 12];

export function EquivalentQuestion({ target, onAnswer }: EquivalentQuestionProps) {
  const [den, setDen] = useState(4);
  const [filled, setFilled] = useState(0);

  function pickDen(newDen: number) {
    setDen(newDen);
    setFilled(0);          // re-splitting the bar resets the fill
  }

  function handleSubmit() {
    const answer: Frac = { num: filled, den };
    const identical = answer.num === target.num && answer.den === target.den;
    onAnswer(!identical && equals(answer, target));
  }

  return (
    <div className="equivalent-question bg-white border-[3px] border-ink rounded-3xl p-6">
      <h2 className="text-xl font-bold mb-2">Make a fraction equal to {target.num}/{target.den}</h2>

      <FractionBar segments={target.den} filled={target.num} label="target fraction" />
      <p className="text-lg font-bold my-3">target: {target.num}/{target.den}</p>

      <p className="font-bold mt-4 mb-2">Split your bar into:</p>
      <div className="flex gap-2 justify-center flex-wrap mb-3">
        {DENOMINATOR_OPTIONS.map((d) => (
          <button
            key={d}
            onClick={() => pickDen(d)}
            className={
              "px-3.5 py-2 rounded-full border-[3px] border-ink bg-white text-ink font-bold transition-transform duration-100 " +
              (d === den ? "bg-equivalent-light border-equivalent scale-110" : "")
            }
          >
            {d}
          </button>
        ))}
      </div>

      <FractionBar
        segments={den}
        filled={filled}
        onSegmentClick={(i) => setFilled(i + 1 === filled ? i : i + 1)}
        label={`your bar, ${den} segments`}
      />
      <p className="text-lg font-bold my-3">Your fraction: {filled}/{den}</p>

      <button className={buttonBase + " bg-success-light border-success"} onClick={handleSubmit}>Submit</button>
    </div>
  );
}