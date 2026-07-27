import { gcd, simplify,equals,compare } from "./lib/fractions";
// console.log("gcd(8,6)",gcd(8,6));
// console.log("simplify", simplify({num:6, den:8}));
// console.log("equal", equals({num: 2, den:4},{num:1,den:2}))
// console.log("compare",compare({num:2, den:4},{num:1,den:2}))
import { generateSession } from "./lib/generator";
console.table(generateSession("compare", "medium", 5));
console.table(generateSession("build", "easy", 5));
console.table(generateSession("equivalent", "hard", 5));
function App() {

  return (
    <>
    </>
  )
}

export default App
