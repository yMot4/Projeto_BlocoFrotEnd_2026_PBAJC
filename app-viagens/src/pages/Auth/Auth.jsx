import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import ApiStatus from "../../components/ApiStatus/ApiStatus";
import AuthForm from "../../components/AuthForm/AuthForm";

export default function Auth({ defaultMode = "login" }) {
  const [mode, setMode] = useState(defaultMode);
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.redirectTo ?? "/";

  const handleSuccess = () => {
    const forwardedTicket = location.state?.ticket
      ? { ticket: location.state.ticket }
      : undefined;
    navigate(redirectTo, { replace: true, state: forwardedTicket });
  };

  return (
    <div className={styles.tela}>
      <div className={styles.foto_background} />
      <ApiStatus />
      <div className={styles.auth_card}>
        <div className={styles.tabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "login"}
            className={`${styles.tab} ${mode === "login" ? styles.tabActive : ""}`}
            onClick={() => setMode("login")}
          >
            Entrar
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "register"}
            className={`${styles.tab} ${mode === "register" ? styles.tabActive : ""}`}
            onClick={() => setMode("register")}
          >
            Cadastrar
          </button>
        </div>
        <AuthForm mode={mode} onSuccess={handleSuccess} />
      </div>
      <div className={styles.painel_verde} />
    </div>
  );
}
