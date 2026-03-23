import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Card from "./Card";

function App() {
  return (
    <>
      <Card
        imagem="Munique.jpg"
        titulo="Munique, Alemanha"
        iconePredio="icone-hotel.png"
        subtitulo="Munich Marriott Hotel"
        iconeEstrela={"icone-estrela.png"}
        pontuacao={4.8}
      />
    </>
  );
}

export default App;
