import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UserBadge from "../components/UserBadge/UserBadge";
import { clearAuth, loadAuth } from "../services/authClient";

jest.mock("../services/authClient", () => ({
  loadAuth: jest.fn(),
  clearAuth: jest.fn(),
}));

beforeEach(() => {
  loadAuth.mockReset();
  clearAuth.mockReset();
});

function renderBadge() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<UserBadge />} />
        <Route path="/auth" element={<div>auth page</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

test("não logado renderiza ícone genérico e rótulo Entrar", () => {
  loadAuth.mockReturnValue(null);
  renderBadge();

  expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  expect(
    screen.queryByRole("menuitem", { name: /sair/i }),
  ).not.toBeInTheDocument();
});

test("não logado: clicar navega para /auth", async () => {
  const user = userEvent.setup();
  loadAuth.mockReturnValue(null);
  renderBadge();

  await user.click(screen.getByRole("button", { name: /entrar/i }));
  expect(await screen.findByText("auth page")).toBeInTheDocument();
});

test("logado mostra iniciais do displayName de duas palavras", () => {
  loadAuth.mockReturnValue({
    displayName: "Arthur Croce",
    email: "arthur@example.com",
  });
  renderBadge();
  expect(screen.getByText("AC")).toBeInTheDocument();
});

test("logado mostra 2 letras quando displayName é uma palavra só", () => {
  loadAuth.mockReturnValue({ displayName: "Arthur" });
  renderBadge();
  expect(screen.getByText("AR")).toBeInTheDocument();
});

test("logado sem displayName cai para 2 letras do e-mail", () => {
  loadAuth.mockReturnValue({ email: "arthur.croce@example.com" });
  renderBadge();
  expect(screen.getByText("AR")).toBeInTheDocument();
});

test("logado: clicar abre menu Sair; clicar Sair limpa autenticação e re-renderiza", async () => {
  const user = userEvent.setup();
  loadAuth.mockReturnValue({
    displayName: "Arthur Croce",
    email: "arthur@example.com",
  });
  renderBadge();

  expect(
    screen.queryByRole("menuitem", { name: /sair/i }),
  ).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /conta de/i }));
  const sair = screen.getByRole("menuitem", { name: /sair/i });
  expect(sair).toBeInTheDocument();

  await user.click(sair);
  expect(clearAuth).toHaveBeenCalledTimes(1);
  expect(screen.queryByText("AC")).not.toBeInTheDocument();
  expect(
    screen.queryByRole("menuitem", { name: /sair/i }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
});

test("logado: clicar duas vezes alterna o menu", async () => {
  const user = userEvent.setup();
  loadAuth.mockReturnValue({ displayName: "Arthur Croce" });
  renderBadge();

  const button = screen.getByRole("button", { name: /conta de/i });

  await user.click(button);
  expect(screen.getByRole("menuitem", { name: /sair/i })).toBeInTheDocument();

  await user.click(button);
  expect(
    screen.queryByRole("menuitem", { name: /sair/i }),
  ).not.toBeInTheDocument();
});
