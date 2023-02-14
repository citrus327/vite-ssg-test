import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(1);

  return (
    <div>
      FRONT PAGE
      <nav>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
        </ul>
      </nav>
      <button onClick={() => setCount((v) => v + 1)}>{count}</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
