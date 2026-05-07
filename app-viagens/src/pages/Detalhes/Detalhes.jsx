import style from "./Detalhes.module.css";
import { ArrowRightStroke, PlaneTakeOff, PlaneAlt, PlaneLand } from "@boxicons/react";

export default function Detalhes() {
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