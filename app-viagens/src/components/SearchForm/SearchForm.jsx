import styles from "./SearchForm.module.css";
import { Plane, Calendar, Group } from "@boxicons/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchForm() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [dataPartida, setDataPartida] = useState("");
  const [numeroViajantes, setNumeroViajantes] = useState(1);

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
          placeholder="De onde você sai?"
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
          placeholder="Para onde você vai?"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
      </div>

      <div className={styles.divider} />

      <div className={styles.rowBottom}>
        <div className={styles.pill}>
          <Calendar className={styles.icon} />
          {/* <span className={styles.pillText}>15/05 – 27/07</span> */}
          <input
            className={styles.input}
            type="text"
            placeholder="dd/mm/aaaa"
            value={dataPartida}
            onChange={(e) => setDataPartida(e.target.value)}
          />
        </div>
        <div className={styles.pillDivider} />
        <div className={styles.pill}>
          <Group className={styles.icon} />
          {/* <span className={styles.pillText}>2 Viajantes</span> */}
          <input
            className={styles.input}
            type="text"
            placeholder="Número de viajantes (1, 2, etc)"
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
