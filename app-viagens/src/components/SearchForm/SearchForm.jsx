import styles from "./SearchForm.module.css";
import { Plane, Calendar, Group } from "@boxicons/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchForm() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [dataPartida, setDataPartida] = useState("");
  const [dataVolta, setDataVolta] = useState("");
  const [numeroViajantes, setNumeroViajantes] = useState("");

  // const handlePesquisar = () => {
  //   alert(`Pesquisando: ${origem || "qualquer origem"} → ${destino || "qualquer destino"}`);
  // };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Plane className={styles.icon} />
        <input
          className={styles.input}
          type="text"
          placeholder="Cidade de partida"
          value={origem}
          onChange={(e) => setOrigem(e.target.value)}
        />
      </div>

      <div className={styles.divider} />

      <div className={styles.row}>
        <Plane className={`${styles.icon} ${styles.iconFlip}`} />
        <input
          className={styles.input}
          type="text"
          placeholder="Cidade de destino"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
      </div>

      <div className={styles.divider} />

      <div className={styles.rowBottom}>
        <div className={styles.pill}>
          {/* <Calendar className={styles.icon} /> */}
          {/* <span className={styles.pillText}>15/05 – 27/07</span> */}
          <label htmlFor="dataPartida" className={styles.pill_label}>Data partida</label>
          <input
            className={styles.input}
            type="date"            
            value={dataPartida}
            onChange={(e) => setDataPartida(e.target.value)}
          />
        </div>
        <div className={styles.pillDivider} />
        <div className={styles.pill}>
          {/* <Calendar className={styles.icon} /> */}
          {/* <span className={styles.pillText}>15/05 – 27/07</span> */}
          <label htmlFor="dataVolta" className={styles.pill_label}>Data retorno</label>
          <input
            className={styles.input}
            type="date"            
            value={dataVolta}
            onChange={(e) => setDataVolta(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.divider} />

      <div className={styles.rowBottom}>
        <div className={styles.pill_viajantes}>
          <Group className={styles.icon} />
          {/* <span className={styles.pillText}>2 Viajantes</span> */}
          <input
            className={styles.input}
            type="text"
            placeholder="Nº viajantes (Ex.: 1)"
            value={numeroViajantes}
            onChange={(e) => setNumeroViajantes(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.divider} />

      <Link
        to={`/passagens?origem=${origem}&destino=${destino}&dataPartida=${dataPartida}&numeroViajantes=${numeroViajantes}`}
      >
        <button className={styles.button}>Pesquisar</button>
      </Link>
    </div>
  );
}
