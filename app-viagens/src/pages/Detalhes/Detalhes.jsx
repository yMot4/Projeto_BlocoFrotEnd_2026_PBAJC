import style from "./Detalhes.module.css";
import { ArrowRightStroke, PlaneTakeOff, PlaneAlt, PlaneLand, User, SteeringWheel, Path } from "@boxicons/react";
import { useState } from "react";

export default function Detalhes() {
    const [count, setCount] = useState(0);
    const [valueCarro, setValueCarro] = useState("nenhum");

    return (
        <>
            <div className={style.tela}>
                <div className={style.container}>
                    <div className={style.section_back}>
                        <div className={style.button_back}>
                            <a href="/">
                                <ArrowRightStroke rotate={180} size="md" />
                            </a>
                        </div>
                    </div>
                    <div className={style.container_detalhes}>
                        <div className={style.box_padding}>
                            <header>Ida e volta para: Tóquio</header>
                            <div className={style.box_passagem}>
                                <h2>Voo para Tóquio</h2>
                                <section>
                                    <div className={style.passagem_localidade}>
                                        <span>06/06 • 3h05</span>
                                        <h3><PlaneTakeOff size="lg" />GIG • Aeroporto Internacional do Rio de Janeiro - Galeão</h3>
                                    </div>
                                </section>
                                <div className={style.div_passagem_info}>
                                    <PlaneAlt />
                                    <div className={style.passagem_info}>
                                        <span>Emirates Airlines</span>
                                        <span>EK248 • Econômica</span>
                                    </div>
                                </div>
                                <section>
                                    <div className={style.passagem_localidade}>
                                        <span>06/06 • 3h05</span>
                                        <h3><PlaneLand size="lg" />GIG • Aeroporto Internacional do Rio de Janeiro - Galeão</h3>
                                    </div>
                                </section>
                            </div>
                            <div className={style.box_passagem}>
                                <h2>Voo para Rio de Janeiro</h2>
                                <section>
                                    <div className={style.passagem_localidade}>
                                        <span>06/06 • 3h05</span>
                                        <h3><PlaneTakeOff size="lg" />GIG • Aeroporto Internacional do Rio de Janeiro - Galeão</h3>
                                    </div>
                                </section>
                                <div className={style.div_passagem_info}>
                                    <PlaneAlt />
                                    <div className={style.passagem_info}>
                                        <span>Emirates Airlines</span>
                                        <span>EK248 • Econômica</span>
                                    </div>
                                </div>
                                <section>
                                    <div className={style.passagem_localidade}>
                                        <span>06/06 • 3h05</span>
                                        <h3><PlaneLand size="lg" />GIG • Aeroporto Internacional do Rio de Janeiro - Galeão</h3>
                                    </div>
                                </section>
                            </div>
                            <div className={style.section_opcionais}>
                                <h2>Hotéis</h2>
                                <span>Aqui vai o card de hoteis </span>
                                <h2>Aluguel de Carros</h2>
                                <select className={style.select_carro} name="" id="" onChange={(e) => setValueCarro(e.target.value)}>
                                    <option value="nenhum">Nenhum</option>
                                    <option value="citroen basalt">Citroen basalt</option>
                                    <option value="renault kwid">Renault Kwid</option>
                                    <option value="fiat mobi">Fiat Mobi</option>
                                </select>

                                {valueCarro !== "nenhum" && (
                                    <>
                                        <div className={style.container_carros}>
                                            <section style={{ flex: "1" }}>
                                                <div className={style.carro_detalhes}>
                                                    <span><User />5 lugares</span>
                                                    <span><SteeringWheel />Automático</span>
                                                    <span><Path />Quilometragem ilimitada</span>
                                                </div>
                                            </section>

                                            <section style={{ flex: "1" }}>
                                                <div className={style.foto_carro}></div>
                                            </section>
                                        </div>

                                        <div className={style.carro_section_valor}>
                                            <h4>Dias:</h4>

                                            <div className={style.contador_gap}>
                                                <button onClick={() => setCount(count - 1)}>
                                                    -
                                                </button>

                                                <span className={style.div_contador}>
                                                    {count}
                                                </span>

                                                <button onClick={() => setCount(count + 1)}>
                                                    +
                                                </button>
                                            </div>

                                            <span>R$730</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={style.section_confirmar}>
                            <span>R$9.662</span>
                            <button type="button">Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}