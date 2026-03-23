import stylesCard from "./Card.modules.css";

export default function Card({imagem, titulo, iconePredio, subtitulo, iconeEstrela, pontuacao, iconeAdicionar, valor}){
    return(
        <div> className={stylesCard.card_container}
        <div className={stylesCard.card_image}>
            <img src={imagem} alt="Imagem do destino" className={stylesCard.image} />
        </div>
        <div className={stylesCard.card_info}>
            <h4>{titulo}</h4>
            <div className={stylesCard.card_subtitle}>
                <i>{iconePredio}</i>
                <p>{subtitulo}</p>
            </div>
            <div className={stylesCard.card_pontuacao}>
                <i>{iconeEstrela}</i>
                <span>{pontuacao}</span>
                <span>(<a>Reviews</a>)</span>                
            </div>
            <div className={card_options}>
                <a>{iconeAdicionar}</a>
                <i></i>
                <i></i>
            </div>
            <div className={card_valor}>{valor}</div>
        </div>
        </div>
    );
}