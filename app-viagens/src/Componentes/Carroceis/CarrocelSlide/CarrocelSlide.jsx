import { useRef, useEffect, useState, use } from "react";
import Card from "../../Card/Card";
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
            if (!response.ok) throw new Error(`HTTP error: Status ${response.status}`);
            
            const result = await response.json();
            setData(result); // Atualiza o estado

            // O "pulo do gato": agendamos o scroll para o próximo ciclo de renderização
            setTimeout(() => {
                const idPrimeiroCard = `carrocel-${titulo}-card-0`;
                const elemento = document.getElementById(idPrimeiroCard);
                if (elemento) {
                    elemento.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
            }, 100); // Um pequeno delay garante que o React já montou os elementos no DOM

        } catch (err) {
            console.error(err);
        }
    };
    fetchData();
}, [maxItens, titulo]);


    const cards = criarArray(data.length).map((_, i) =>       <Card key={i}
        idCarrocel={titulo}
        numeroCard={i}
        imagem="Munique.jpg"
        titulo="Munique, Alemanha"
        iconePredio="icone-hotel.png"
        subtitulo="Munich Marriott Hotel"
        iconeEstrela={"icone-estrela.png"}
        pontuacao={4.8}
        iconeAdicionar={"icone-plus.png"}
        iconeCar={"icone-car.png"}
        iconePlaca={"icone-placa.png"}
        valor={"R$2.458"}
      />);

    const botoes = criarArray(data.length).map((_, i) => <BotaoSlide key={i} idCarrocel={titulo} numeroCard={i} />);

    return (
        <section id={titulo} className="carrocelContainer">
            <div className="carrocelTitle">
                <h2 className="carrocelTitle-text">{titulo}</h2></div>

            {/* -=-=Estrutura=-=- */}
            <div className="carrocelContent">
                {/*--=Container externo para segurar o conteúdo=-=- */}
                <div className="carrocelContent-containerHolder">
                    {/* -=-=Container interno com os cards=-=- */}
                    <div
                        className="carrocelContent-containerHolder-vitrini"
                        ref={carrocelRef}
                    >
                        {cards}
                    </div>
                </div>
            </div>

            <section className="carrocelSlideContainer" >
                <div className="carrocelSlideContainer-content"
                >{botoes}</div>
            </section>
        </section>
    );
}
export default CarrocelSlide;

function BotaoSlide({ numeroCard, idCarrocel }) {
    const idDoCard = `carrocel-${idCarrocel}-card-${numeroCard}`;
    return (
        <a
            href={`#${idDoCard}`}
            onClick={(e)=>{handleClick(e, idDoCard)}}
            className= "carrocelSlideContainer-content-botoesAncora"
        >
            <div className="carrocelSlideContainer-content-botoesAncora-corpo"></div>
        </a>
    );
}