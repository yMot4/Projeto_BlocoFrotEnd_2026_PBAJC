

import { useRef } from "react";

const criarArray = (tamanho) => Array.from({ length: tamanho });


function Carrocel({ itens }) {
    const carrocelRef = useRef(null);
    const velocidadeCarrocel = 200;

    const ultimoToque = useRef(null);
    const frame = useRef(null);

    // Novo: Controla se o usuário está segurando o botão do mouse
    const isDragging = useRef(false);

    const cards = criarArray(itens).map((_, i) => <Card key={i} />);

    const moverCarrocel = (qtd) => {
        const el = carrocelRef.current;
        if (!el) return;
        el.scrollLeft = el.scrollLeft + qtd;
    };

    // --- EVENTOS DE TOUCH (MOBILE) ---
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

    // --- EVENTOS DE MOUSE (DESKTOP) ---
    const handleMouseDown = (e) => {
        isDragging.current = true;
        // e.pageX pega a posição do mouse na página
        ultimoToque.current = e.pageX;
    };

    const handleMouseMove = (e) => {
        // Se o mouse se mover mas não estiver clicado, não faz nada
        if (!isDragging.current) return;

        // Evita selecionar texto ou imagens acidentalmente ao arrastar
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
        // Desliga o modo de arrasto se soltar o botão ou se o mouse sair do carrossel
        isDragging.current = false;
        ultimoToque.current = null;
        if (frame.current) {
            cancelAnimationFrame(frame.current);
            frame.current = null;
        }
    };

    return (
        <div style={{
            backgroundColor: 'black',
            height: '250px',
            width: '90%',
            display: 'flex', // Container principal é flex
            alignItems: 'center',
            margin: '0 auto'
        }}>
            {/* BOTÃO ESQUERDA */}
            <div
                style={{ height: '100%', width: '100px', backgroundColor: 'gray', cursor: 'pointer', flexShrink: 0 }}
                onClick={() => { moverCarrocel(-velocidadeCarrocel) }}
            />

            {/* WRAPPER DO CARROSSEL (O "TRILHO") */}
            <div style={{
                flex: 1,           // Ocupa o espaço restante entre os botões
                height: "100%",
                overflow: "hidden" // Esconde o que sai pelas laterais
            }}>
                <div
                    ref={carrocelRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        overflowX: 'hidden',
                        gap: "30px",
                        width: '100%',
                        height: '100%',
                        cursor: 'grab',
                        padding: "0 30px",
                        userSelect: 'none'
                    }}
                >
                    {cards}
                </div>
            </div>
            <div
                style={{ height: '100%', width: '100px', backgroundColor: 'gray', cursor: 'pointer', flexShrink: 0 }}
                onClick={() => { moverCarrocel(velocidadeCarrocel) }}
            />
        </div>
    );
}
export default Carrocel;

function Card() {
    return (
        <>
            <div style={{ backgroundColor: 'pink', aspectRatio: '1', height: '90%' }}></div>
        </>
    )

}

