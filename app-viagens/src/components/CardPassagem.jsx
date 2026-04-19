import styleCardPass from "./CardPassagem.module.css";

export default function CardPassagem() {
  return (
    <section className={styleCardPass.container}>
      <div className={styleCardPass.card_lateral}>
        <div className={styleCardPass.div_aviao}>
          <img src="/plane.svg" alt="Icone de avião" />
        </div>
        <div className={styleCardPass.card_lat_titulo}>
          <span>Airlines</span>
        </div>
      </div>
    </section>
  );
}
