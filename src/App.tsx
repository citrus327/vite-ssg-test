import { useState } from "react";

if (import.meta.env.SSR) {
  console.log("this is from server");
}

function App() {
  const [count, setCount] = useState(124123123);

  return (
    <div>
      <button onClick={() => setCount((v) => v + 1)}>{count}</button>
    </div>
  );
}

export default App;
