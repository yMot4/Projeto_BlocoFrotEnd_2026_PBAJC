import style from "./Passagens.module.css";
import {
  ArrowRightStroke,
  ArrowDownUp,
  MenuFilter,
  LoaderLinesAlt,
} from "@boxicons/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardPassagem from "../../components/CardPassagem/CardPassagem";

export default function Passagens() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const origem = params.get("origem");
  const destino = params.get("destino");
  const dataPartida = params.get("dataPartida");
  const numeroViajantes = params.get("numeroViajantes");

  useEffect(() => {
    const fetchDados = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/fakeAPI.json");
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }
        const resultado = await response.json();
        setDados(resultado);
      } catch (erro) {
        setError(erro.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDados();
  }, [origem, destino, dataPartida, numeroViajantes]);

  if (loading) return <LoaderLinesAlt rotate={45} />;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className={style.tela}>
      <div className={style.container}>
        <div className={style.section_back}>
          <div className={style.button_back}>
            <a href="/">
              <ArrowRightStroke rotate={180} size="md" />
            </a>
          </div>
        </div>
        <div className={style.section_filters}>
          <div className={style.button_filters}>
            <ArrowDownUp />
            <span>Ordenar</span>
          </div>
          <div className={style.button_filters}>
            <MenuFilter />
            <span>Filtrar</span>
          </div>
        </div>
        <section className={style.section_cards}>
          <h2>Resultado da Pesquisa</h2>
          {dados.map((dado) => (
            <CardPassagem key={dado.id} dados={dado} />
          ))}
        </section>
      </div>
    </div>
  );
}
