import { useNavigate } from "react-router-dom";
import { User } from "@boxicons/react";
import styles from "./UserBadge.module.css";
import { loadAuth } from "../../services/authClient";

function initialsFrom(auth) {
  const name = auth?.displayName?.trim();
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }
  const email = auth?.email?.trim();
  if (email) {
    const local = email.split("@")[0];
    return local.slice(0, 2).toUpperCase();
  }
  return "";
}

export default function UserBadge() {
  const navigate = useNavigate();
  const auth = loadAuth();

  const handleClick = () => {
    if (!auth) {
      navigate("/auth");
      return;
    }
    navigate("/perfil");
  };

  const initials = initialsFrom(auth);
  const label = auth
    ? `Ver perfil de ${auth.displayName ?? auth.email}`
    : "Entrar";

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.badge}
        aria-label={label}
        onClick={handleClick}
      >
        {auth && initials ? (
          <span className={styles.initials}>{initials}</span>
        ) : (
          <User className={styles.icon} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
