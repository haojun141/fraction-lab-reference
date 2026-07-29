import { useState } from "react";
import type { Frac } from "../type";
import { equals } from "../lib/fractions";
import { FractionBar } from "./FractionBar";

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
    <div>
      <h2>Make a fraction equal to {target.num}/{target.den}</h2>

      <FractionBar segments={target.den} filled={target.num} label="target fraction" />
      <p>target: {target.num}/{target.den}</p>

      <p>Split your bar into:</p>
      <div>
        {DENOMINATOR_OPTIONS.map((d) => (
          <button
            key={d}
            onClick={() => pickDen(d)}
            className={d === den ? "den-active" : undefined}
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
      <p>Your fraction: {filled}/{den}</p>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}