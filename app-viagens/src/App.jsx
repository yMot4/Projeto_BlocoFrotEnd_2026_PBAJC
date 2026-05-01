import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/main_page";
import Passagens from "./pages/Passagens/Passagens";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/passagens" element={<Passagens />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
