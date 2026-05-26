import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/main_page";
import Passagens from "./pages/Passagens/Passagens";
import Detalhes from "./pages/Detalhes/Detalhes";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/passagens" element={<Passagens />} />
          <Route path="/detalhes/:id" element={<Detalhes/>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/login" element={<Auth defaultMode="login" />} />
          <Route path="/auth/register" element={<Auth defaultMode="register" />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
