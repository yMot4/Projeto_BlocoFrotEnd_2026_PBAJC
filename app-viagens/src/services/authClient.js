const API_BASE = "https://travelagencyapi-a5zb.onrender.com/api/v1";
const STORAGE_KEY = "travelAgencyAuth";

async function postJson(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(messageFor(res.status, text));
  }
  return res.json();
}

function messageFor(status, text) {
  if (status === 400) return "Dados inválidos. Verifique e tente novamente.";
  if (status === 401) return "E-mail ou senha incorretos.";
  if (status === 429) return "Muitas tentativas. Aguarde um minuto.";
  return text || "Erro ao conectar. Tente novamente em instantes.";
}

export async function login(credentials) {
  const auth = await postJson("/auth/login", credentials);
  saveAuth(auth);
  return auth;
}

export async function register(payload) {
  const auth = await postJson("/auth/register", payload);
  saveAuth(auth);
  return auth;
}

export function saveAuth(auth) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
}

export function loadAuth() {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearAuth() {
  sessionStorage.removeItem(STORAGE_KEY);
}
