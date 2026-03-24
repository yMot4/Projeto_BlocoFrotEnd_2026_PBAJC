import { useState } from 'react'
import Carrocel from './Componentes/Carroceis/Carrocel/Carrocel.jsx'
import CarrocelSlide from './Componentes/Carroceis/CarrocelSlide/CarrocelSlide.jsx'
import "./App.css";
import Card from "./Card";

function App() {
  return (
    <>
      <Carrocel itens={10}/>    
      <CarrocelSlide itens={20} titulo='slide'/>     
      <Card
        imagem="Munique.jpg"
        titulo="Munique, Alemanha"
        iconePredio="icone-hotel.png"
        subtitulo="Munich Marriott Hotel"
        iconeEstrela={"icone-estrela.png"}
        pontuacao={4.8}
        iconeAdicionar={"icone-plus.png"}
        iconeCar={"icone-car.png"}
        iconePlaca={"icone-placa.png"}
        valor={"R$2.458"}
      />
    </>
  );
}

export default App;
