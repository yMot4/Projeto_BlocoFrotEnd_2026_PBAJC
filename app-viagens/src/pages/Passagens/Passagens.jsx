import style from "./Passagens.module.css";
import {
  ArrowRightStroke,
  ArrowDownUp,
  MenuFilter,
  LoaderLinesAlt,
} from "@boxicons/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import CardPassagem from "../../components/CardPassagem/CardPassagem";
import Button from "../../components/Button";

export default function Passagens() {
  const location = useLocation();
  const prefetched = location.state?.results;
  const [dados, setDados] = useState(prefetched ?? []);
  const [loading, setLoading] = useState(!prefetched);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const origem = params.get("origem");
  const destino = params.get("destino");
  const dataIda = params.get("dataIda");
  const dataVolta = params.get("dataVolta");
  const adultos = params.get("adultos") ?? "1";
  const criancas = params.get("criancas") ?? "0";

  useEffect(() => {
    if (prefetched) return;
    if (!origem || !destino || !dataIda) {
      setError("Parâmetros de busca incompletos.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const fetchDados = async () => {
      try {
        setLoading(true);
        setError(null);
        const qs = new URLSearchParams({
          Origem: origem,
          Destino: destino,
          DataIda: dataIda,
          Adultos: adultos,
          Criancas: criancas,
        });
        if (dataVolta) qs.set("DataVolta", dataVolta);
        const response = await fetch(
          `https://travelagencyapi-a5zb.onrender.com/api/v1/travel-tickets/search?${qs.toString()}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }
        const resultado = await response.json();
        setDados(resultado);
      } catch (erro) {
        if (erro.name !== "AbortError") setError(erro.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDados();
    return () => controller.abort();
  }, [prefetched, origem, destino, dataIda, dataVolta, adultos, criancas]);

  const calcularMedia = (lista) => {
    if (!lista.length) return 0;
    const soma = lista.reduce((acc, item) => acc + Number(item.valor), 0);
    return soma / lista.length;
  };

  //filtrar por valores abaixo ou igual ao preço médio
  const filtrarPorMedia = () => {
    const media = calcularMedia(dados);
    setDados((prev) => prev.filter((item) => Number(item.valor) <= media));
  };

  return (
    <div className={style.tela}>
      <div className={style.container}>
        <div className={style.section_back}>
          <Button
            ariaLabel="Voltar"
            className={style.button_back}
            onClick={() => navigate(-1)}
          >
            <ArrowRightStroke rotate={180} size="md" color="white" />
          </Button>
        </div>
        <div className={style.section_filters}>
          <Button
            className={style.button_filters}
            onClick={() => {
              setDados((prev) =>
                [...prev].sort((a, b) => Number(b.valor) - Number(a.valor)),
              );
            }}
          >
            <ArrowDownUp />
            <span>Ordenar pelo maior valor</span>
          </Button>
          <Button className={style.button_filters} onClick={filtrarPorMedia}>
            <MenuFilter />
            <span>Filtrar inferior preço médio</span>
          </Button>
        </div>
        <div className={style.passagens}>
          <div className={style.titulo_section_cards}>
            <h2>Passagens disponíveis para a pesquisa</h2>
          </div>
          <section className={style.section_cards}>
            {dados.map((dado) => (
              <Link key={dado.id} to={`/detalhes/${dado.id}`} state={dado}>
                <CardPassagem key={dado.id} dados={dado} />
              </Link>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
