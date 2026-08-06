import { buttonBase } from "../lib/styles";

interface FeedbackScreenProps {
  correct: boolean;
  attemptIndex: number;
  onNext: () => void;
}

const CORRECT_EMOJI = ["🎉", "🥳", "⭐", "✨", "👏"];
const CORRECT_MESSAGES = ["Awesome!", "You got it!", "Fraction master!", "Nailed it!", "Great job!"];

const INCORRECT_EMOJI = ["🤔", "💡", "😅", "👍"];
const INCORRECT_MESSAGES = ["So close!", "Nice try!", "Keep going!", "Almost!"];

export function FeedbackScreen({ correct, attemptIndex, onNext }: FeedbackScreenProps) {
  const emoji = correct
    ? CORRECT_EMOJI[attemptIndex % CORRECT_EMOJI.length]
    : INCORRECT_EMOJI[attemptIndex % INCORRECT_EMOJI.length];
  const message = correct
    ? CORRECT_MESSAGES[attemptIndex % CORRECT_MESSAGES.length]
    : INCORRECT_MESSAGES[attemptIndex % INCORRECT_MESSAGES.length];

  return (
    <div
      className={
        "relative border-[3px] border-ink rounded-[2rem] p-10 max-w-sm mx-auto mt-10 motion-reduce:animate-none " +
        (correct ? "bg-success-light animate-feedback-correct" : "bg-error-light animate-feedback-incorrect")
      }
    >
      {correct && (
        <>
          <span className="absolute top-2 left-4 text-2xl animate-sparkle-float motion-reduce:animate-none">
            🎉
          </span>
          <span className="absolute top-3 right-4 text-2xl animate-sparkle-float motion-reduce:animate-none [animation-delay:0.4s]">
            ⭐
          </span>
        </>
      )}
      <p className="text-6xl mb-2 animate-emoji-wiggle motion-reduce:animate-none">{emoji}</p>
      <p className="text-2xl font-bold mb-4">{message}</p>
      <button className={buttonBase + " bg-white"} onClick={onNext}>
        Next
      </button>
    </div>
  );
}
