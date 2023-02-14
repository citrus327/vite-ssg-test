import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(1);

  return (
    <div>
      FRONT PAGE
      <button onClick={() => setCount((v) => v + 1)}>{count}</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
