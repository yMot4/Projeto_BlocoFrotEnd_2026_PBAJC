import stylesCard from "./Card.module.css";

export default function Card({
  idCarrocel,
  numeroCard,
  imagem,
  titulo,
  iconePredio,
  subtitulo,
  iconeEstrela,
  pontuacao,
  iconeAdicionar,
  iconeCar,
  iconePlaca,
  valor,
}) {
const idDoCard = `carrocel-${idCarrocel}-card-${numeroCard}`;


  return (
    <div id={idDoCard} className={stylesCard.card_container}>
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
          <img src={iconeAdicionar} />
          <img src={iconeCar}/>
          <img src={iconePlaca}/>
        </div>
        <div className={stylesCard.card_valor}>
            <span>{valor}</span>
        </div>
      </div>
    </div>
  );
}
