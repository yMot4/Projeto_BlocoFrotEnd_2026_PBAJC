import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightStroke,
  Building,
  Calendar,
  Envelope,
  Group,
  User,
} from "@boxicons/react";
import { loadAuth, clearAuth } from "../../services/authClient";
import styles from "./Perfil.module.css";

const pacotesComprados = [
  {
    id: 1,
    destino: "Munique, Alemanha",
    hotel: "Munich Marriott Hotel",
    dataViagem: "2026-08-20",
    viajantes: 2,
    valor: 2458,
    status: "Confirmado",
    imagem: "/assets/Munique.webp",
  },
  {
    id: 2,
    destino: "Munique, Alemanha",
    hotel: "Munich Marriott Hotel",
    dataViagem: "2026-06-18",
    viajantes: 1,
    valor: 2458,
    status: "Confirmado",
    imagem: "/assets/Munique.webp",
  },
  {
    id: 3,
    destino: "Munique, Alemanha",
    hotel: "Munich Marriott Hotel",
    dataViagem: "2026-03-12",
    viajantes: 3,
    valor: 7374,
    status: "Finalizado",
    imagem: "/assets/Munique.webp",
  },
];

function formatarData(dataIso) {
  const data = new Date(`${dataIso}T00:00:00`);
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function podeCancelar(dataViagem) {
  const hoje = new Date();
  const viagem = new Date(`${dataViagem}T00:00:00`);
  const limiteCancelamento = new Date(viagem);

  limiteCancelamento.setMonth(limiteCancelamento.getMonth() - 1);

  return hoje <= limiteCancelamento;
}

function iniciaisDoUsuario(auth) {
  const nome = auth?.displayName?.trim();
  if (nome) {
    const partes = nome.split(/\s+/).filter(Boolean);
    if (partes.length > 1) return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
    return partes[0].slice(0, 2).toUpperCase();
  }

  const email = auth?.email?.trim();
  if (email) return email.split("@")[0].slice(0, 2).toUpperCase();

  return "US";
}

export default function Perfil() {
  const navigate = useNavigate();
  const auth = loadAuth();
  const [pacotes, setPacotes] = useState(pacotesComprados);

  const nomeUsuario = auth?.displayName || "Usuario viajante";
  const emailUsuario = auth?.email || "email nao informado";
  const iniciais = iniciaisDoUsuario(auth);

  const totalInvestido = useMemo(
    () =>
      pacotes
        .filter((pacote) => pacote.status !== "Cancelado")
        .reduce((total, pacote) => total + pacote.valor, 0),
    [pacotes],
  );

  const handleCancelar = (id) => {
    setPacotes((atuais) =>
      atuais.map((pacote) =>
        pacote.id === id ? { ...pacote, status: "Cancelado" } : pacote,
      ),
    );
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <main className={styles.tela}>
      <section className={styles.hero}>
        <button
          type="button"
          className={styles.buttonBack}
          aria-label="Voltar"
          onClick={() => navigate(-1)}
        >
          <ArrowRightStroke rotate={180} size="md" color="white" />
        </button>

        <button
          type="button"
          className={styles.buttonLogout}
          aria-label="Sair da conta"
          onClick={handleLogout}
        >
          Sair
        </button>

        <div className={styles.userHeader}>
          <div className={styles.avatar}>{iniciais}</div>
          <div>
            <h1>{nomeUsuario}</h1>
            <p>{emailUsuario}</p>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <aside className={styles.profileCard}>
          <h2>Dados pessoais</h2>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <User className={styles.infoIcon} />
              <div>
                <span>Nome</span>
                <strong>{nomeUsuario}</strong>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Envelope className={styles.infoIcon} />
              <div>
                <span>E-mail</span>
                <strong>{emailUsuario}</strong>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Calendar className={styles.infoIcon} />
              <div>
                <span>Cadastro</span>
                <strong>Ativo</strong>
              </div>
            </div>
          </div>

          <div className={styles.summaryBox}>
            <span>Total em pacotes</span>
            <strong>{formatarMoeda(totalInvestido)}</strong>
          </div>
        </aside>

        <section className={styles.historySection}>
          <div className={styles.sectionTitle}>
            <h2>Historico de pacotes</h2>
            <span>{pacotes.length} compras</span>
          </div>

          <div className={styles.packageList}>
            {pacotes.map((pacote) => {
              const cancelavel =
                pacote.status === "Confirmado" && podeCancelar(pacote.dataViagem);

              return (
                <article className={styles.packageCard} key={pacote.id}>
                  <img
                    className={styles.packageImage}
                    src={pacote.imagem}
                    alt={`Imagem de ${pacote.destino}`}
                  />

                  <div className={styles.packageInfo}>
                    <div className={styles.packageTop}>
                      <div>
                        <h3>{pacote.destino}</h3>
                        <p>
                          <Building className={styles.inlineIcon} />
                          {pacote.hotel}
                        </p>
                      </div>
                      <span
                        className={`${styles.status} ${
                          styles[`status${pacote.status}`]
                        }`}
                      >
                        {pacote.status}
                      </span>
                    </div>

                    <div className={styles.packageDetails}>
                      <span>
                        <Calendar className={styles.inlineIcon} />
                        {formatarData(pacote.dataViagem)}
                      </span>
                      <span>
                        <Group className={styles.inlineIcon} />
                        {pacote.viajantes} viajante{pacote.viajantes > 1 ? "s" : ""}
                      </span>
                      <strong>{formatarMoeda(pacote.valor)}</strong>
                    </div>

                    <div className={styles.packageActions}>
                      <button
                        type="button"
                        className={styles.cancelButton}
                        disabled={!cancelavel}
                        onClick={() => handleCancelar(pacote.id)}
                      >
                        {cancelavel
                          ? "Cancelar pacote"
                          : "Cancelamento indisponivel"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
