import style from "./Detalhes.module.css";
import {
    ArrowRightStroke,
    PlaneTakeOff,
    PlaneAlt,
    PlaneLand,
} from "@boxicons/react";
import { useState } from "react";
import Button from "../../components/Button";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function Detalhes() {
    const { id } = useParams();
    const location = useLocation();
    const item = location.state;
    const navigate = useNavigate();

    const [count, setCount] = useState(0);
    const [valueCarro, setValueCarro] = useState("nenhum");

    if (!item) return <p className={style.status}>Nenhum dado encontrado.</p>;

    const {
        ciaAerea,
        valor,
        aeroPartidaIda, aeroChegadaIda, dataPartidaIda, horaPartidaIda, dataChegadaIda, horaChegadaIda,
        aeroPartidaVolta, aeroChegadaVolta, dataPartidaVolta, horaPartidaVolta, dataChegadaVolta, horaChegadaVolta,
    } = item;

    const renderVoo = ({ aeroPartida, aeroChegada, dataPartida, horaPartida, dataChegada, horaChegada, titulo }) => (
        <div className={style.box_passagem}>
            <h2>{titulo}</h2>

            <section>
                <div className={style.passagem_localidade}>
                    <span>{dataPartida} • {horaPartida}</span>
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
                    <span>{dataChegada} • {horaChegada}</span>
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
                    <Button ariaLabel="Voltar" className={style.button_back} onClick={() => navigate(-1)}>
                        <ArrowRightStroke rotate={180} size="md" color="white" />
                    </Button>
                </div>

                <div className={style.container_detalhes}>
                    <div className={style.box_padding}>
                        <header>Ida e volta para: {aeroChegadaIda}</header>

                        {renderVoo({
                            aeroPartida: aeroPartidaIda,
                            aeroChegada: aeroChegadaIda,
                            dataPartida: dataPartidaIda,
                            horaPartida: horaPartidaIda,
                            dataChegada: dataChegadaIda,
                            horaChegada: horaChegadaIda,
                            titulo: `Voo para ${aeroChegadaIda}`,
                        })}

                        {aeroPartidaVolta && renderVoo({
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
                        </div>
                    </div>

                    <div className={style.section_confirmar}>
                        <span>
                            R$ {Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                        <button type="button">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}