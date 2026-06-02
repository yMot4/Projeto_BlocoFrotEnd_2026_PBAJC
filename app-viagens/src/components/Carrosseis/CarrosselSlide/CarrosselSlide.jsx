import { useRef, useEffect, useState, useCallback } from "react";
import Card from "../../Card/Card";
import stylesSlide from './CarrosselSlide.module.css';
import stylesContainer from '../Carrosseis.module.css';


const TempoAutoSlide = 3000;
const TempoAMaisAutoSlide = 5000;
const TempoComDelayAutoSlide = TempoAutoSlide + TempoAMaisAutoSlide; 

const criarArray = (maxItens) => {
    const array = Array.from({ length: maxItens - 1 });
    array.splice(0, 0, array[array.length - 1]);
    return array;
};

export default function CarrosselSlide({ titulo, velocidadeCarrossel = 200, maxItens }) {
    
    const [data, setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const vitriniRef = useRef(null);
    const activeIndexRef = useRef(0);
    const timerRef = useRef(null);
    const posicaoInicialRef = useRef(0);
    const scrollInicialRef = useRef(0);
    const frameRef = useRef(null);
    const isDraggingRef = useRef(false);
    const arrastouRef = useRef(false);

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

const agendarProximoSlide = useCallback((delay) => {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            if (data.length > 0) {
                const proxIndex = (activeIndexRef.current + 1) % data.length;
                const idDoProxCard = `carrossel-${titulo}-card-${proxIndex}`;
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
    }, [data.length, titulo]);

    useEffect(() => {
        if (data.length > 0) {
            agendarProximoSlide(TempoAutoSlide);
        }
        return () => clearTimeout(timerRef.current);
    }, [data.length, agendarProximoSlide]);

    const handleUserInteraction = () => {
        agendarProximoSlide(TempoComDelayAutoSlide);
    };

    const moverCarrossel = (posicaoX) => {
        const el = vitriniRef.current;
        if (!el) return;

        const distancia = (posicaoX - posicaoInicialRef.current) * (velocidadeCarrossel / 200);
        arrastouRef.current = Math.abs(distancia) > 4;
        el.scrollLeft = scrollInicialRef.current - distancia;
    };

    const centralizarCardMaisProximo = () => {
        const el = vitriniRef.current;
        if (!el || !el.children.length) return;

        const centroDaVitrine = el.getBoundingClientRect().left + el.clientWidth / 2;
        let menorDistancia = Infinity;
        let indexMaisProximo = activeIndexRef.current;

        Array.from(el.children).forEach((item) => {
            const itemRect = item.getBoundingClientRect();
            const centroDoItem = itemRect.left + itemRect.width / 2;
            const distancia = Math.abs(centroDaVitrine - centroDoItem);

            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                indexMaisProximo = Number(item.getAttribute('data-index'));
            }
        });

        const itemMaisProximo = el.children[indexMaisProximo];
        if (!itemMaisProximo) return;

        itemMaisProximo.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });

        setActiveIndex(indexMaisProximo);
        activeIndexRef.current = indexMaisProximo;
    };

    const finalizarGesto = (e) => {
        const el = vitriniRef.current;
        const deveCentralizar = arrastouRef.current;

        isDraggingRef.current = false;
        posicaoInicialRef.current = 0;
        scrollInicialRef.current = 0;
        arrastouRef.current = false;

        if (el) {
            if (typeof e?.pointerId === 'number' && el.hasPointerCapture(e.pointerId)) {
                el.releasePointerCapture(e.pointerId);
            }

            el.style.scrollBehavior = '';
            el.style.scrollSnapType = '';
        }

        if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = null;
        }

        if (deveCentralizar) {
            requestAnimationFrame(centralizarCardMaisProximo);
        }
    };

    const handlePointerDown = (e) => {
        const el = vitriniRef.current;
        if (!el) return;

        handleUserInteraction();
        isDraggingRef.current = true;
        arrastouRef.current = false;
        posicaoInicialRef.current = e.clientX;
        scrollInicialRef.current = el.scrollLeft;
        el.style.scrollBehavior = 'auto';
        el.style.scrollSnapType = 'none';
        el.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (!isDraggingRef.current) return;

        e.preventDefault();
        if (!frameRef.current) {
            const posicaoX = e.clientX;

            frameRef.current = requestAnimationFrame(() => {
                moverCarrossel(posicaoX);
                frameRef.current = null;
            });
        }
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
                idCarrossel={titulo}
                numeroCard={i}
                titulo="Munique, Alemanha"
                subtitulo="Munich Marriott Hotel"
                pontuacao={4.8}
                iconeAdicionar="/icone-plus.png"
                valor="R$2.458"
            />
        </div>
    ));

    const botoes = criarArray(data.length).map((_, i) => (
        <BotaoSlide 
            key={i} 
            idCarrossel={titulo}
            numeroCard={i} 
            isActive={i === activeIndex}
            onInteraction={handleUserInteraction} 
        />
    ));

    return (
        <section id={titulo} className={stylesContainer.carrosselContainer}>
            <div className={stylesContainer.carrosselTitle}>
                <h2>Pacotes Promocionais</h2>
            </div>
            
            <div className={stylesContainer.carrosselContent}>
                <div className={stylesContainer.containerHolder}>
                    <div
                        className={stylesContainer.vitrini}
                        ref={vitriniRef}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={finalizarGesto}
                        onPointerCancel={finalizarGesto}
                        onWheel={handleUserInteraction}
                    >
                        {cards}
                    </div>
                </div>
            </div>

            <section className={stylesSlide.carrosselSlideContainer}>
                <div className={stylesSlide.content}>
                    {botoes}
                </div>
            </section>
        </section>
    );
}

function BotaoSlide({ numeroCard, idCarrossel, isActive, onInteraction }) {
    const idDoCard = `carrossel-${idCarrossel}-card-${numeroCard}`;
    
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
