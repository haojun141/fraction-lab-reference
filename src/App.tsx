//import { gcd, simplify,equals,compare } from "./lib/fractions";
// console.log("gcd(8,6)",gcd(8,6));
// console.log("simplify", simplify({num:6, den:8}));
// console.log("equal", equals({num: 2, den:4},{num:1,den:2}))
// console.log("compare",compare({num:2, den:4},{num:1,den:2}))
// import { generateSession } from "./lib/generator";
// console.table(generateSession("compare", "medium", 5));
// console.table(generateSession("build", "easy", 5));
// console.table(generateSession("equivalent", "hard", 5));
import { gameReducer, initialState } from "./gameReducer";

let s = initialState;
console.log("MENU:", s.phase, "score", s.score);

s = gameReducer(s, { type: "START", mode: "compare", difficulty: "easy" });
console.log("STARTED:", s.phase, "| q1 of", s.questions.length, "|", s.questions[0]);

s = gameReducer(s, { type: "ANSWER", correct: true });
console.log("ANSWERED right:", s.phase, "| score", s.score, "| streak", s.streak);

s = gameReducer(s, { type: "NEXT" });
console.log("NEXT:", s.phase, "| now on question", s.current + 1);

s = gameReducer(s, { type: "ANSWER", correct: true });
console.log("right again:", "score", s.score, "streak", s.streak);

s = gameReducer(s, { type: "NEXT" });
s = gameReducer(s, { type: "ANSWER", correct: false });
console.log("missed last one:", "score", s.score, "streak", s.streak);

s = gameReducer(s, { type: "NEXT" });
console.log("FINISHED:", s.phase, "| results", s.results, "| final score", s.score);

// illegal move test — should change nothing:
const before = s;
s = gameReducer(s, { type: "ANSWER", correct: true });
console.log("cheating after summary changed nothing:", s === before);
function App() {

  return (
    <>
    </>
  )
}

export default App
