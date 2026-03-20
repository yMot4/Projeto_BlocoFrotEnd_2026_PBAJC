import { useRef, useEffect, useState } from "react";
import './CarrocelSlide.css';
import '/src/Componentes/Carroceis/Carriceis.css'

const criarArray = (tamanho) => {
    const array = Array.from({ length: tamanho });
    array.splice(0, 0, array[array.length - 1]);
    return array
};
const handleClick = (e, idDoCard) => {
    e.preventDefault();
        const elemento = document.getElementById(idDoCard);
        if (elemento) {
            elemento.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    };

function CarrocelSlide({ titulo, velocidadeCarrocel = 200, maxItens = 5 }) {
    const idDaVez = useRef(0);

    
    const carrocelRef = useRef(null);
    const ultimoToque = useRef(null);
    const frame = useRef(null);
    const isDragging = useRef(false);


    {/* -=-=API=-=- */ }
    const [data, setData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${maxItens}`);
                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
            }
        };
        fetchData();
    })

    const cards = criarArray(data.length).map((_, i) => <Card key={i} idCarrocel={titulo} numeroCard={i} />);
    const botoes = criarArray(data.length).map((_, i) => <BotaoSlide key={i} idCarrocel={titulo} numeroCard={i} />);
    const moverCarrocel = (qtd) => {
        const el = carrocelRef.current;
        if (!el) return;
        el.scrollLeft = el.scrollLeft + qtd;
    };
    const handleTouchStart = (e) => {
        ultimoToque.current = e.touches[0].screenX;
    };
    const handleTouchMove = (e) => {
        if (!frame.current) {
            frame.current = requestAnimationFrame(() => {
                const esseToque = e.touches[0].screenX;
                if (ultimoToque.current !== null) {
                    const diferencaDeToque = ultimoToque.current - esseToque;
                    moverCarrocel(diferencaDeToque);
                }
                ultimoToque.current = esseToque;
                frame.current = null;
            });
        }
    };
    const handleTouchEnd = () => {
        ultimoToque.current = null;
        if (frame.current) {
            cancelAnimationFrame(frame.current);
            frame.current = null;
        }
    };
    const handleMouseDown = (e) => {
        isDragging.current = true;
        ultimoToque.current = e.pageX;
    };
    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();

        if (!frame.current) {
            frame.current = requestAnimationFrame(() => {
                const esseToque = e.pageX;
                if (ultimoToque.current !== null) {
                    const diferencaDeToque = ultimoToque.current - esseToque;
                    moverCarrocel(diferencaDeToque);
                }
                ultimoToque.current = esseToque;
                frame.current = null;
            });
        }
    };
    const handleMouseUpOrLeave = () => {
        isDragging.current = false;
        ultimoToque.current = null;
        if (frame.current) {
            cancelAnimationFrame(frame.current);
            frame.current = null;
        }
    };

    return (
        <section id={titulo} className="carrocelContainer">
            <div className="carrocelTitle">
                <h2 className="carrocelTitle-text">{titulo}</h2></div>

            {/* -=-=Estrutura=-=- */}
            <div className="carrocelContent">

                {/* -=-=Botão carrocel (Esquerda)=-=- */}
                <div className="carrocelContent-botaoProximo" onClick={() => { moverCarrocel(-velocidadeCarrocel) }}
                ></div>

                {/*--=Container externo para segurar o conteúdo=-=- */}
                <div className="carrocelContent-containerHolder">

                    {/* -=-=Container interno com os cards=-=- */}
                    <div
                        className="carrocelContent-containerHolder-vitrini"
                        ref={carrocelRef}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUpOrLeave}
                        onMouseLeave={handleMouseUpOrLeave}
                    >
                        {cards}
                    </div>
                </div>
                {/* -=-=Botão carrocel (Deireita)=-=- */}
                <div className="carrocelContent-botaoProximo" onClick={() => { moverCarrocel(velocidadeCarrocel) }}
                ></div>
            </div>

            <section style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                width: "100%",
                height: "50px",
            }}>
                <div style={{
                    background: "black",
                    borderRadius: "10px",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "3px",
                }}>{botoes}</div>
            </section>
        </section>
    );
}
export default CarrocelSlide;

function Card({ numeroCard, idCarrocel }) {
    const idDoCard = `carrocel-${idCarrocel}-card-${numeroCard}`;
    return (
        <div
            id={idDoCard}
            style={{
                backgroundColor: 'red',
                aspectRatio: '2',
                height: '90%',
                flexShrink: 0,
                scrollSnapAlign: 'center'
            }}
        ></div>
    )
}
function BotaoSlide({ numeroCard, idCarrocel }) {
    const idDoCard = `carrocel-${idCarrocel}-card-${numeroCard}`;
    return (
        <a
            href={`#${idDoCard}`}
            onClick={(e)=>{handleClick(e, idDoCard)}}
            style={{ textDecoration: "none", height: 'auto', alignContent: 'center' }}
        >
            <div style={{ backgroundColor: 'blue', aspectRatio: '1', height: '50%', borderRadius: '100%' }}></div>
        </a>
    );
}