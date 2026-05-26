import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@boxicons/react";
import styles from "./UserBadge.module.css";
import { clearAuth, loadAuth } from "../../services/authClient";

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
  const [auth, setAuth] = useState(() => loadAuth());
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Click-outside dismisses the menu — matches the dropdown pattern in SearchForm.
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const handleClick = () => {
    if (!auth) {
      navigate("/auth");
      return;
    }
    setOpen((v) => !v);
  };

  const handleLogout = () => {
    clearAuth();
    setAuth(null);
    setOpen(false);
  };

  const initials = initialsFrom(auth);
  const label = auth
    ? `Conta de ${auth.displayName ?? auth.email}`
    : "Entrar";

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.badge}
        aria-label={label}
        aria-haspopup={auth ? "menu" : undefined}
        aria-expanded={auth ? open : undefined}
        onClick={handleClick}
      >
        {auth && initials ? (
          <span className={styles.initials}>{initials}</span>
        ) : (
          <User className={styles.icon} aria-hidden="true" />
        )}
      </button>

      {auth && open && (
        <div className={styles.menu} role="menu">
          <button
            type="button"
            role="menuitem"
            className={styles.menuItem}
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
