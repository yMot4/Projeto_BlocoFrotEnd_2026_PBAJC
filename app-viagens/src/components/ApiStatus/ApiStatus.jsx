import { useEffect, useState } from "react";
import styles from "./ApiStatus.module.css";

const HEALTH_URL =
  "https://travelagencyapi-a5zb.onrender.com/api/v1/providers/health";
const SWAGGER_URL =
  "https://travelagencyapi-a5zb.onrender.com/swagger/index.html";
const POLL_MS = 30000;
const TIMEOUT_MS = 15000;

const STATUS = {
  loading: {
    className: styles.loading,
    text: "Por favor aguarde, conectando à API...",
  },
  online: { className: styles.online, text: "API online" },
  offline: { className: styles.offline, text: "API offline" },
};

export default function ApiStatus() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    const ping = async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
      try {
        const res = await fetch(HEALTH_URL, { signal: controller.signal });
        if (!cancelled) setStatus(res.ok ? "online" : "offline");
      } catch {
        if (!cancelled) setStatus("offline");
      } finally {
        clearTimeout(timer);
      }
    };

    ping();
    const interval = setInterval(ping, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const { className, text } = STATUS[status];

  if (status === "online") {
    return (
      <a
        className={`${styles.container} ${styles.containerLink}`}
        href={SWAGGER_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Abrir Swagger em nova aba"
      >
        <span className={`${styles.dot} ${className}`} aria-hidden="true" />
        <span className={styles.label}>{text}</span>
      </a>
    );
  }

  return (
    <div className={styles.container}>
      <span className={`${styles.dot} ${className}`} aria-hidden="true" />
      <span className={styles.label}>{text}</span>
    </div>
  );
}
