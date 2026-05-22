import { render, screen } from "@testing-library/react";
import CardPassagem from "../components/CardPassagem/CardPassagem";

TestTube("renderiza dados da passagem", ()=>{
    const mockDados = {
    ciaAerea: "LATAM",
    horaPartidaIda: "08:00",
    aeroPartidaIda: "GIG",
    dataPartidaIda: "22/05/2026",
    horaChegadaIda: "10:00",
    aeroChegadaIda: "GRU",
    dataChegadaIda: "22/05/2026",
    horaPartidaVolta: "18:00",
    aeroPartidaVolta: "GRU",
    dataPartidaVolta: "25/05/2026",
    horaChegadaVolta: "20:00",
    aeroChegadaVolta: "GIG",
    dataChegadaVolta: "25/05/2026",
    paradas: 1,
    valor: 1200,
  };
  
  render(<CardPassagem dados={mockDados} />);
  expect(screen.getByText("LATAM")).toBeInTheDocument();
  expect(screen.getByText("08:00")).toBeInTheDocument(); 
  expect(screen.getByText("GIG · 22/05/2026")).toBeInTheDocument(); //Alt + 0183 para o ponto
  expect(screen.getByText("10:00")).toBeInTheDocument();
  expect(screen.getByText("GRU · 22/05/2026")).toBeInTheDocument();

  expect(screen.getByText("18:00")).toBeInTheDocument();
  expect(screen.getByText("GRU · 25/05/2026")).toBeInTheDocument();
  expect(screen.getByText("20:00")).toBeInTheDocument();
  expect(screen.getByText("GIG · 25/05/2026")).toBeInTheDocument();

  expect(screen.getByAltText("Bagagem porão")).toBeInTheDocument();
  expect(screen.getByAltText("Bagagem de mão")).toBeInTheDocument();

  expect(screen.getByText("1 Parada")).toBeInTheDocument();

  expect(screen.getByText("R$1200")).toBeInTheDocument(); 
  

});


