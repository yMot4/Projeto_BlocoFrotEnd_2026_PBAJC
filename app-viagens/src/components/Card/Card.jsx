import stylesCard from "./Card.module.css";
import {Directions, Car, Building, Star} from '@boxicons/react';

export default function Card({
  idCarrossel,
  numeroCard,
  titulo,
  subtitulo,
  pontuacao,
  iconeAdicionar,
  valor,
  imgemSrc
}) {
const idDoCard = `carrossel-${idCarrossel}-card-${numeroCard}`;

  return (
    <div id={idDoCard} className={stylesCard.card_container}>
      <div className={stylesCard.card_image}>
        <img
          src={imgemSrc}
          alt={titulo}
          className={stylesCard.image}
        />
      </div>
      <div className={stylesCard.card_info}>
        <div className={stylesCard.card_titulo}>
          <span className={stylesCard.titulo}>{titulo}</span>
        </div>
        <div className={stylesCard.card_subtitle}>
          <Building />
          <p>{subtitulo}</p>
        </div>
        <div className={stylesCard.card_pontuacao}>
          <Star pack="filled" />
          <span>{pontuacao}</span>
          <span className={stylesCard.reviews}>(Reviews)</span>
        </div>
        <div className={stylesCard.card_options}>
          <div className={stylesCard.card_icone}>
            <img src={iconeAdicionar} />
          </div>
          <div className={stylesCard.card_icone}>
            <Car />
            <Directions />
          </div>
        </div>
        <div className={stylesCard.card_valor}>
          <span>{valor}</span>
        </div>
      </div>
    </div>
  );
}
