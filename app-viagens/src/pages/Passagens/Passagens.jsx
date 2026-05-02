import style from "./Passagens.module.css";
import { ArrowRightStroke, ArrowDownUp, MenuFilter } from "@boxicons/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Passagens() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
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
        setErro(null);
        const response = await fetch();
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }
        const resultado = await response.json();
        setDados(resultado);
      } catch (erro) {
        setErro(erro.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDados();
  }, [origem, destino, dataPartida, numeroViajantes]);

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
        <section className={style.section_cards}></section>
      </div>
    </div>
  );
}
