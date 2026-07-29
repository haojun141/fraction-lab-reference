import { gameReducer, initialState } from "./gameReducer";
import { useReducer } from "react";
import "./App.css";
import { useState } from "react";
import { FractionBar } from "./components/FractionBar";

function App(){
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [testFilled, setTestFilled] = useState(0);
  return (
    <div className="app">
      <h2>display: 3/4</h2>
<FractionBar segments={4} filled={3} />

<h2>display finer: 6/8</h2>
<FractionBar segments={8} filled={6} />

<h2>interactive — click me: {testFilled}/6</h2>
<FractionBar
  segments={6}
  filled={testFilled}
  onSegmentClick={(i) => setTestFilled(i + 1)}
/>
      <h1>Fraction Lab</h1>
      <p>phase: {state.phase} | score: {state.score} | streak: {state.streak}</p>
      {state.phase === "menu" && (
        <button onClick={()=>dispatch({
          type: "START", mode: "compare", difficulty: "easy"
        })}> Start</button>
      )} 

      {state.phase ==="playing" && (
        <div>
          <p>Question {state.current + 1 } of {state.questions.length}</p>
          <button onClick={()=>dispatch({type: "ANSWER", correct: true})}>pretend correct</button>
          <button onClick={()=>dispatch({type: "ANSWER", correct: false})}>pretend wrong</button>
        </div>
      )}
      {state.phase ==="feedback" && (
        <div>
          <p>{state.results[state.results.length -1] ? "Correct!" : "Not Quite"}</p>
          <button onClick={()=>dispatch({type: "NEXT"})}>Next</button>
        </div>
      )}
    {state.phase === "summary" && (
      <div>
        <p>Final score: {state.score}</p>
        <p>{state.results.filter(Boolean).length} of {state.results.length} Correct</p>
        <button onClick={()=>dispatch({type: "RESTART"})}>Play Again</button>
      </div>
    )}
    </div>
  )
}


export default App
