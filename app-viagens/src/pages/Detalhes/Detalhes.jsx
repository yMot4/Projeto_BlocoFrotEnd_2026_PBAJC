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
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function Detalhes() {
    const { id } = useParams();
    const location = useLocation();
    const item = location.state;
    const navigate = useNavigate();

    const [count, setCount] = useState(1);
    const [valueCarro, setValueCarro] = useState("nenhum");

    if (!item) {
        return <p className={style.status}>Nenhum dado encontrado.</p>;
    }

    const {
        ciaAerea,
        valor,
        aeroPartidaIda,
        aeroChegadaIda,
        dataPartidaIda,
        horaPartidaIda,
        dataChegadaIda,
        horaChegadaIda,
        aeroPartidaVolta,
        aeroChegadaVolta,
        dataPartidaVolta,
        horaPartidaVolta,
        dataChegadaVolta,
        horaChegadaVolta,
    } = item;

    const carros = [
        {
            id: 1,
            modelo: "Fiat Mobi",
            lugares: 5,
            cambio: "Manual",
            quilometragem: "Livre",
            precoPorDia: 89.9,
            foto: null,
        },
        {
            id: 2,
            modelo: "Hyundai HB20",
            lugares: 5,
            cambio: "Automático",
            quilometragem: "Livre",
            precoPorDia: 129.9,
            foto: null,
        },
        {
            id: 3,
            modelo: "Chevrolet Onix",
            lugares: 5,
            cambio: "Automático",
            quilometragem: "Livre",
            precoPorDia: 149.9,
            foto: null,
        },
        {
            id: 4,
            modelo: "Jeep Renegade",
            lugares: 5,
            cambio: "Automático",
            quilometragem: "Livre",
            precoPorDia: 219.9,
            foto: null,
        },
    ];

    const carroSelecionado = carros.find(
        (carro) => carro.modelo === valueCarro
    );

    const valorCarro = carroSelecionado
        ? carroSelecionado.precoPorDia * count
        : 0;

    const valorTotal = Number(valor) + valorCarro;

    const renderVoo = ({
        aeroPartida,
        aeroChegada,
        dataPartida,
        horaPartida,
        dataChegada,
        horaChegada,
        titulo,
    }) => (
        <div className={style.box_passagem}>
            <h2>{titulo}</h2>

            <section>
                <div className={style.passagem_localidade}>
                    <span>
                        {dataPartida} • {horaPartida}
                    </span>
                    <h3>
                        <PlaneTakeOff size="lg" />
                        {aeroPartida}
                    </h3>
                </div>
            </section>

            <div className={style.div_passagem_info}>
                <PlaneAlt />
                <div className={style.passagem_info}>
                    <span>{ciaAerea}</span>
                </div>
            </div>

            <section>
                <div className={style.passagem_localidade}>
                    <span>
                        {dataChegada} • {horaChegada}
                    </span>
                    <h3>
                        <PlaneLand size="lg" />
                        {aeroChegada}
                    </h3>
                </div>
            </section>
        </div>
    );

    return (
        <div className={style.tela}>
            <div className={style.container}>
                <div className={style.section_back}>
                    <Button
                        ariaLabel="Voltar"
                        className={style.button_back}
                        onClick={() => navigate(-1)}
                    >
                        <ArrowRightStroke
                            rotate={180}
                            size="md"
                            color="white"
                        />
                    </Button>
                </div>

                <div className={style.container_detalhes}>
                    <div className={style.box_padding}>
                        <header>
                            Ida e volta para: {aeroChegadaIda}
                        </header>

                        {renderVoo({
                            aeroPartida: aeroPartidaIda,
                            aeroChegada: aeroChegadaIda,
                            dataPartida: dataPartidaIda,
                            horaPartida: horaPartidaIda,
                            dataChegada: dataChegadaIda,
                            horaChegada: horaChegadaIda,
                            titulo: `Voo para ${aeroChegadaIda}`,
                        })}

                        {aeroPartidaVolta &&
                            renderVoo({
                                aeroPartida: aeroPartidaVolta,
                                aeroChegada: aeroChegadaVolta,
                                dataPartida: dataPartidaVolta,
                                horaPartida: horaPartidaVolta,
                                dataChegada: dataChegadaVolta,
                                horaChegada: horaChegadaVolta,
                                titulo: `Voo para ${aeroChegadaVolta}`,
                            })}

                        <div className={style.section_opcionais}>
                            <h2>Hotéis</h2>

                            <h2>Aluguel de Carros</h2>

                            <select
                                className={style.select_carro}
                                value={valueCarro}
                                onChange={(e) => {
                                    setValueCarro(e.target.value);
                                    setCount(1);
                                }}
                            >
                                <option value="nenhum">
                                    Nenhum
                                </option>

                                {carros.map((carro) => (
                                    <option
                                        key={carro.id}
                                        value={carro.modelo}
                                    >
                                        {carro.modelo}
                                    </option>
                                ))}
                            </select>

                            {valueCarro !== "nenhum" &&
                                carroSelecionado && (
                                    <>
                                        <div
                                            className={
                                                style.container_carros
                                            }
                                        >
                                            <section
                                                style={{
                                                    flex: "1",
                                                }}
                                            >
                                                <div
                                                    className={
                                                        style.carro_detalhes
                                                    }
                                                >
                                                    <span>
                                                        <User />
                                                        {
                                                            carroSelecionado.lugares
                                                        }{" "}
                                                        lugares
                                                    </span>

                                                    <span>
                                                        <SteeringWheel />
                                                        {
                                                            carroSelecionado.cambio
                                                        }
                                                    </span>

                                                    <span>
                                                        <Path />
                                                        {
                                                            carroSelecionado.quilometragem
                                                        }
                                                    </span>
                                                </div>
                                            </section>

                                            <section
                                                style={{
                                                    flex: "1",
                                                }}
                                            >
                                                {carroSelecionado.foto ? (
                                                    <img
                                                        src={
                                                            carroSelecionado.foto
                                                        }
                                                        alt={
                                                            carroSelecionado.modelo
                                                        }
                                                        className={
                                                            style.foto_carro
                                                        }
                                                    />
                                                ) : (
                                                    <div
                                                        className={
                                                            style.foto_carro
                                                        }
                                                    />
                                                )}
                                            </section>
                                        </div>

                                        <div
                                            className={
                                                style.carro_section_valor
                                            }
                                        >
                                            <h4>Dias:</h4>

                                            <div
                                                className={
                                                    style.contador_gap
                                                }
                                            >
                                                <button
                                                    onClick={() =>
                                                        setCount(
                                                            (c) =>
                                                                Math.max(
                                                                    1,
                                                                    c - 1
                                                                )
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>

                                                <span
                                                    className={
                                                        style.div_contador
                                                    }
                                                >
                                                    {count}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        setCount(
                                                            (c) =>
                                                                c + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <span>
                                                R${" "}
                                                {(
                                                    carroSelecionado.precoPorDia *
                                                    count
                                                ).toLocaleString(
                                                    "pt-BR",
                                                    {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    }
                                                )}
                                            </span>
                                        </div>
                                    </>
                                )}
                        </div>
                    </div>

                    <div className={style.section_confirmar}>
                        <span>
                            R${" "}
                            {valorTotal.toLocaleString(
                                "pt-BR",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }
                            )}
                        </span>

                        <button type="button">
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}