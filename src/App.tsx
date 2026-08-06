import { gameReducer, initialState } from "./gameReducer";
import { useReducer } from "react";
import { BuildQuestion } from "./components/BuildQuestion";
import { CompareQuestion } from "./components/CompareQuestion";
import { EquivalentQuestion } from "./components/EquivalentQuestion";
import { MenuScreen } from "./components/MenuScreen";
import { FeedbackScreen } from "./components/FeedbackScreen";
import { playCorrectSound, playIncorrectSound, playSelectSound } from "./lib/sound";
import { buttonBase } from "./lib/styles";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  function handleAnswer(correct: boolean) {
    if (correct) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
    dispatch({ type: "ANSWER", correct });
  }

  function handleNext() {
    playSelectSound();
    dispatch({ type: "NEXT" });
  }

  function handleRestart() {
    playSelectSound();
    dispatch({ type: "RESTART" });
  }

  return (
    <div className="font-body text-ink max-w-xl mx-auto my-10 px-6 text-center">
      {state.phase === "menu" && (
        <MenuScreen onStart={(mode, difficulty) => dispatch({ type: "START", mode, difficulty })} />
      )}

      {state.phase === "playing" && (
        <div>
          <div className="flex flex-col items-center gap-2.5 mb-4">
            <div className="flex gap-2">
              {state.questions.map((_, i) => (
                <span
                  key={i}
                  className={
                    "w-3.5 h-3.5 rounded-full border-2 border-ink " +
                    (i === state.current
                      ? "bg-equivalent scale-125"
                      : i < state.current
                        ? "bg-success"
                        : "bg-white")
                  }
                />
              ))}
            </div>
            <div className="flex gap-3">
              <span className="font-bold bg-white border-2 border-ink rounded-full px-3.5 py-1 text-sm">
                ⭐ Score: {state.score}
              </span>
              <span className="font-bold bg-white border-2 border-ink rounded-full px-3.5 py-1 text-sm">
                🔥 Streak: {state.streak}
              </span>
            </div>
          </div>
          {(() => {
            const q = state.questions[state.current];

            if (q.mode === "build") {
              return (
                <BuildQuestion
                  key={state.current}
                  target={q.target}
                  segments={q.segments}
                  onAnswer={handleAnswer}
                />
              );
            }
            if (q.mode === "compare") {
              return (
                <CompareQuestion
                  key={state.current}
                  left={q.left}
                  right={q.right}
                  onAnswer={handleAnswer}
                />
              );
            }
            if (q.mode === "equivalent") {
              return (
                <EquivalentQuestion key={state.current} target={q.target} onAnswer={handleAnswer} />
              );
            }
          })()}
        </div>
      )}

      {state.phase === "feedback" && (
        <FeedbackScreen
          correct={state.results[state.results.length - 1]}
          attemptIndex={state.results.length - 1}
          onNext={handleNext}
        />
      )}

      {state.phase === "summary" && (
        <div className="bg-white border-[3px] border-ink rounded-[2rem] p-8 max-w-sm mx-auto mt-10">
          <h2 className="text-2xl font-bold">Session Complete!</h2>
          <p className="text-4xl my-3">
            {state.results.map((correct, i) => (
              <span key={i}>{correct ? "⭐" : "☆"}</span>
            ))}
          </p>
          <p className="text-xl font-bold my-2">Final score: {state.score}</p>
          <p className="opacity-80 mb-4">
            {state.results.filter(Boolean).length} of {state.results.length} correct
          </p>
          <button className={buttonBase + " bg-success-light border-success"} onClick={handleRestart}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
