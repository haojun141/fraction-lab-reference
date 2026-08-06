import { useState } from "react";
import type { Difficulty, Mode } from "../type";
import { playSelectSound } from "../lib/sound";

interface MenuScreenProps {
  onStart: (mode: Mode, difficulty: Difficulty) => void;
}

const DIFFICULTIES: { value: Difficulty; label: string; emoji: string; border: string; activeBg: string }[] = [
  { value: "easy", label: "Easy", emoji: "🌱", border: "border-easy", activeBg: "bg-easy-light" },
  { value: "medium", label: "Medium", emoji: "🌟", border: "border-medium", activeBg: "bg-medium-light" },
  { value: "hard", label: "Hard", emoji: "🔥", border: "border-hard", activeBg: "bg-hard-light" },
];

const MODES: { value: Mode; label: string; emoji: string; description: string; border: string; hoverBg: string }[] = [
  {
    value: "build",
    label: "Build",
    emoji: "🧱",
    description: "Fill the bar to match a fraction",
    border: "border-build",
    hoverBg: "hover:bg-build-light",
  },
  {
    value: "compare",
    label: "Compare",
    emoji: "⚖️",
    description: "Which fraction is bigger?",
    border: "border-compare",
    hoverBg: "hover:bg-compare-light",
  },
  {
    value: "equivalent",
    label: "Equivalent",
    emoji: "🟰",
    description: "Make an equal fraction",
    border: "border-equivalent",
    hoverBg: "hover:bg-equivalent-light",
  },
];

export function MenuScreen({ onStart }: MenuScreenProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  function pickDifficulty(d: Difficulty) {
    playSelectSound();
    setDifficulty(d);
  }

  function pickMode(mode: Mode) {
    playSelectSound();
    onStart(mode, difficulty);
  }

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold my-2 mb-6">Fraction Lab 🍕</h1>

      <p className="font-bold my-5 mb-2.5 text-lg">Pick a difficulty</p>
      <div className="flex gap-3 justify-center flex-wrap">
        {DIFFICULTIES.map((d) => (
          <button
            key={d.value}
            className={
              "font-bold px-5 py-2.5 m-2 rounded-full border-[3px] bg-white text-ink transition-transform duration-100 " +
              d.border +
              (d.value === difficulty ? " scale-[1.08] " + d.activeBg : "")
            }
            onClick={() => pickDifficulty(d.value)}
          >
            {d.emoji} {d.label}
            {d.value === difficulty && <span> ✓</span>}
          </button>
        ))}
      </div>

      <p className="font-bold my-5 mb-2.5 text-lg">Pick a mode</p>
      <div className="flex gap-4 justify-center flex-wrap mt-2">
        {MODES.map((m) => (
          <button
            key={m.value}
            className={
              "flex flex-col items-center gap-1 w-[150px] p-5 rounded-3xl border-[3px] bg-white text-ink " +
              m.border +
              " " +
              m.hoverBg
            }
            onClick={() => pickMode(m.value)}
          >
            <span className="text-4xl">{m.emoji}</span>
            <span className="text-lg font-bold">{m.label}</span>
            <span className="text-xs font-normal opacity-75">{m.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
