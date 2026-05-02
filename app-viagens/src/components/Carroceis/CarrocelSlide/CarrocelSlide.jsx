import { useRef, useEffect, useState } from "react";
import Card from "../../Card/Card";
import stylesSlide from './CarrocelSlide.module.css';
import stylesContainer from '../Carroceis.module.css';


const TempoAutoSlide = 3000;
const TempoAMaisAutoSlide = 5000;
const TempoComDelayAutoSlide = TempoAutoSlide + TempoAMaisAutoSlide; 

const criarArray = (maxItens) => {
    const array = Array.from({ length: maxItens - 1 });
    array.splice(0, 0, array[array.length - 1]);
    return array;
};

export default function CarrocelSlide({ titulo, velocidadeCarrocel = 200, maxItens }) {
    
    const [data, setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const vitriniRef = useRef(null);
    const activeIndexRef = useRef(0);
    const timerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${maxItens}`);
                if (!response.ok) throw new Error(`HTTP error: Status ${response.status}`);
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [maxItens, titulo]);

const agendarProximoSlide = (delay) => {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            if (data.length > 0) {
                const proxIndex = (activeIndexRef.current + 1) % data.length;
                const idDoProxCard = `carrocel-${titulo}-card-${proxIndex}`;
                const elemento = document.getElementById(idDoProxCard);
                
                if (elemento) {
                    elemento.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                    setActiveIndex(proxIndex);
                    activeIndexRef.current = proxIndex;
                }
            }
            agendarProximoSlide(TempoAutoSlide);
        }, delay);
    };

    useEffect(() => {
        if (data.length > 0) {
            agendarProximoSlide(TempoAutoSlide);
        }
        return () => clearTimeout(timerRef.current);
    }, [data.length]);

    const handleUserInteraction = () => {
        agendarProximoSlide(TempoComDelayAutoSlide);
    };

useEffect(() => {
        if (!vitriniRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.getAttribute('data-index'));
                    setActiveIndex(index);
                    activeIndexRef.current = index; 
                }
            });
        }, {
            root: vitriniRef.current,
            threshold: 0.5 
        });

        const items = vitriniRef.current.children;
        Array.from(items).forEach(item => observer.observe(item));

        return () => observer.disconnect();
    }, [data]);

    const cards = criarArray(data.length).map((_, i) => (
        <div key={i} className={stylesContainer.snapItem} data-index={i}>
            <Card
                idCarrocel={titulo}
                numeroCard={i}
                imagem="Munique.jpg"
                titulo="Munique, Alemanha"
                iconePredio="icone-hotel.png"
                subtitulo="Munich Marriott Hotel"
                iconeEstrela="icone-estrela.png"
                pontuacao={4.8}
                iconeAdicionar="icone-plus.png"
                iconeCar="icone-car.png"
                iconePlaca="icone-placa.png"
                valor="R$2.458"
            />
        </div>
    ));

    const botoes = criarArray(data.length).map((_, i) => (
        <BotaoSlide 
            key={i} 
            idCarrocel={titulo} 
            numeroCard={i} 
            isActive={i === activeIndex}
            onInteraction={handleUserInteraction} 
        />
    ));

    return (
        <section id={titulo} className={stylesContainer.carrocelContainer}>
            <div className={stylesContainer.carrocelTitle}>
                {/* <h2>{titulo}</h2> */}
                <h2>Pacotes Promocionais</h2>
            </div>
            
            <div className={stylesContainer.carrocelContent}>
                <div className={stylesContainer.containerHolder}>
                    <div
                        className={stylesContainer.vitrini}
                        ref={vitriniRef}
                        onTouchStart={handleUserInteraction}
                        onMouseDown={handleUserInteraction}
                        onWheel={handleUserInteraction}
                    >
                        {cards}
                    </div>
                </div>
            </div>

            <section className={stylesSlide.carrocelSlideContainer}>
                <div className={stylesSlide.content}>
                    {botoes}
                </div>
            </section>
        </section>
    );
}

function BotaoSlide({ numeroCard, idCarrocel, isActive, onInteraction }) {
    const idDoCard = `carrocel-${idCarrocel}-card-${numeroCard}`;
    
    const handleClick = (e) => {
        e.preventDefault();
        onInteraction(); 
        const elemento = document.getElementById(idDoCard);
        if (elemento) {
            elemento.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    };

    return (
        <a
            href={`#${idDoCard}`}
            onClick={handleClick}
            className={stylesSlide.botoesAncora}
        >
            <div className={isActive ? stylesSlide.corpoAtivo : stylesSlide.corpo}></div>
        </a>
    );
}