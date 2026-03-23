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
        iconeAdicionar={"icone-plus.png"}
        iconeCar={"icone-car.png"}
        iconePlaca={"icone-placa.png"}
        valor={"R$2.458"}
      />
    </>
  );
}

export default App;
