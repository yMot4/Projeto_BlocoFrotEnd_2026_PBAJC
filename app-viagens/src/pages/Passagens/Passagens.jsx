import style from "./Passagens.module.css"
import { ArrowRightStroke, ArrowDownUp, MenuFilter } from '@boxicons/react';


export default function Passagens() {
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
                <div className={style.section_cards}>
                </div>
            </div>
        </div>
    );
}