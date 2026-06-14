import { useState } from "react";
import { Envelope, Lock, User } from "@boxicons/react";
import styles from "./AuthForm.module.css";
import { login, register, resgatarPacotePendente } from "../../services/authClient";

export default function AuthForm({ mode, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const isRegister = mode === "register";

  // §7: Display Name resets when switching away from register; email/password persist.
  // Adjusting state during render (React docs: "you might not need an effect").
  const [prevMode, setPrevMode] = useState(mode);
  if (mode !== prevMode) {
    setPrevMode(mode);
    if (mode !== "register") setDisplayName("");
  }
  const canSubmit =
    email.includes("@") &&
    password.length >= 8 &&
    (!isRegister || displayName.trim().length >= 2) &&
    !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const auth = isRegister
        ? await register({ email, password, displayName: displayName.trim() })
        : await login({ email, password });
        resgatarPacotePendente(auth.email); 
      onSuccess?.(auth);
    } catch (err) {
      setError(err.message || "Não foi possível concluir. Tente novamente.");
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {isRegister && (
        <div className={styles.row}>
          <User className={styles.icon} />
          <input
            type="text"
            className={styles.input}
            placeholder="Como devemos te chamar?"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            autoComplete="name"
            aria-label="Nome de exibição"
          />
        </div>
      )}

      <div className={styles.row}>
        <Envelope className={styles.icon} />
        <input
          type="email"
          className={styles.input}
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          aria-label="E-mail"
        />
      </div>

      <div className={styles.row}>
        <Lock className={styles.icon} />
        <input
          type="password"
          className={styles.input}
          placeholder="Senha (mínimo 8 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isRegister ? "new-password" : "current-password"}
          aria-label="Senha"
        />
      </div>

      <button type="submit" className={styles.button} disabled={!canSubmit}>
        {submitting ? (
          <span className={styles.buttonLoading}>
            <span className={styles.spinner} aria-hidden="true" />
            Enviando...
          </span>
        ) : isRegister ? (
          "Criar conta"
        ) : (
          "Entrar"
        )}
      </button>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </form>
  );
}
