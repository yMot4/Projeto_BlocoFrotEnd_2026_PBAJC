import stylesCard from "./Card.module.css";

export default function Card({
  imagem,
  titulo,
  iconePredio,
  subtitulo,
  iconeEstrela,
  pontuacao,
  iconeAdicionar,
  valor,
}) {
  return (
    <div className={stylesCard.card_container}>
      <div className={stylesCard.card_image}>
        <img
          src={imagem}
          alt="Imagem do destino"
          className={stylesCard.image}
        />
      </div>
      <div className={stylesCard.card_info}> 
        <div className={stylesCard.card_titulo}> 
          <span className={stylesCard.titulo}>{titulo}</span>
        </div> 
        <div className={stylesCard.card_subtitle}>
          <img src={iconePredio} alt="Ícone de hotel"/>
          <p>{subtitulo}</p>
        </div>
        <div className={stylesCard.card_pontuacao}>
          <img src={iconeEstrela} />
          <span>{pontuacao}</span>
          <span className={stylesCard.reviews}>
            (Reviews)
          </span>
        </div>
        <div className={stylesCard.card_options}>
          <a>{iconeAdicionar}</a>
          <i></i>
          <i></i>
        </div>
        <div className={stylesCard.card_valor}>{valor}</div>
      </div>
    </div>
  );
}
