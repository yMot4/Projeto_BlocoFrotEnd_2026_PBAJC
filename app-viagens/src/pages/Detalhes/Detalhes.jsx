import style from "./Detalhes.module.css";
import {
    ArrowRightStroke,
    PlaneTakeOff,
    PlaneAlt,
    PlaneLand,
    User,
    SteeringWheel,
    Path,
} from "@boxicons/react";
import { useState } from "react";
import Button from "../../components/Button";
import { useParams, useLocation } from "react-router-dom";

export default function Detalhes() {
    const { id } = useParams();
    const location = useLocation();
    const item = location.state;

    const [count, setCount] = useState(0);
    const [valueCarro, setValueCarro] = useState("nenhum");

    if (!item) return <p className={style.status}>Nenhum dado encontrado.</p>;

    const { destino, preco, vooIda, vooVolta, hoteis, carros } = item;

    const carroSelecionado = carros?.find((c) => c.modelo === valueCarro);

    const renderVoo = (voo, titulo) => {
        if (!voo) return null;
        return (
            <div className={style.box_passagem}>
                <h2>{titulo}</h2>

                <section>
                    <div className={style.passagem_localidade}>
                        <span>{voo.dataPartida} • {voo.horaPartida}</span>
                        <h3>
                            <PlaneTakeOff size="lg" />
                            {voo.codigoAeroportoPartida} • {voo.nomeAeroportoPartida}
                        </h3>
                    </div>
                </section>

                <div className={style.div_passagem_info}>
                    <PlaneAlt />
                    <div className={style.passagem_info}>
                        <span>{voo.companhia}</span>
                        <span>{voo.numero} • {voo.classe}</span>
                    </div>
                </div>

                <section>
                    <div className={style.passagem_localidade}>
                        <span>{voo.dataChegada} • {voo.horaChegada}</span>
                        <h3>
                            <PlaneLand size="lg" />
                            {voo.codigoAeroportoChegada} • {voo.nomeAeroportoChegada}
                        </h3>
                    </div>
                </section>
            </div>
        );
    };

    return (
        <div className={style.tela}>
            <div className={style.container}>
                <div className={style.section_back}>
                    <Button ariaLabel="Voltar" className={style.button_back} onClick={() => navigate(-1)}>
                        <ArrowRightStroke rotate={180} size="md" color="white" />
                    </Button>
                </div>

                <div className={style.container_detalhes}>
                    <div className={style.box_padding}>
                        <header>Ida e volta para: {destino}</header>

                        {renderVoo(vooIda, `Voo para ${destino}`)}
                        {renderVoo(vooVolta, "Voo para Rio de Janeiro")}

                        <div className={style.section_opcionais}>
                            <h2>Hotéis</h2>
                            {hoteis?.length > 0 ? (
                                hoteis.map((hotel) => (
                                    <div key={hotel.id} className={style.card_hotel}>
                                        <span>{hotel.nome}</span>
                                        <span>{hotel.endereco}</span>
                                        <span>R$ {hotel.precoPorNoite}/noite</span>
                                    </div>
                                ))
                            ) : (
                                <span>Nenhum hotel disponível</span>
                            )}

                            <h2>Aluguel de Carros</h2>
                            <select
                                className={style.select_carro}
                                value={valueCarro}
                                onChange={(e) => { setValueCarro(e.target.value); setCount(0); }}
                            >
                                <option value="nenhum">Nenhum</option>
                                {carros?.map((carro) => (
                                    <option key={carro.id} value={carro.modelo}>
                                        {carro.modelo}
                                    </option>
                                ))}
                            </select>

                            {valueCarro !== "nenhum" && carroSelecionado && (
                                <>
                                    <div className={style.container_carros}>
                                        <section style={{ flex: "1" }}>
                                            <div className={style.carro_detalhes}>
                                                <span><User />{carroSelecionado.lugares} lugares</span>
                                                <span><SteeringWheel />{carroSelecionado.cambio}</span>
                                                <span><Path />{carroSelecionado.quilometragem}</span>
                                            </div>
                                        </section>
                                        <section style={{ flex: "1" }}>
                                            {carroSelecionado.foto
                                                ? <img src={carroSelecionado.foto} alt={carroSelecionado.modelo} className={style.foto_carro} />
                                                : <div className={style.foto_carro} />
                                            }
                                        </section>
                                    </div>

                                    <div className={style.carro_section_valor}>
                                        <h4>Dias:</h4>
                                        <div className={style.contador_gap}>
                                            <button onClick={() => setCount((c) => Math.max(0, c - 1))}>-</button>
                                            <span className={style.div_contador}>{count}</span>
                                            <button onClick={() => setCount((c) => c + 1)}>+</button>
                                        </div>
                                        <span>
                                            R$ {(carroSelecionado.precoPorDia * Math.max(count, 1)).toLocaleString("pt-BR")}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className={style.section_confirmar}>
                        <span>
                            R$ {Number(preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                        <button type="button">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}