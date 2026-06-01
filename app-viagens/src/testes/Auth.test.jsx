import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Auth from "../pages/Auth/Auth";

jest.mock("../services/authClient", () => ({
  login: jest.fn(),
  register: jest.fn(),
}));

// ApiStatus faz fetch em useEffect; substitui por stub para isolar a página.
jest.mock("../components/ApiStatus/ApiStatus", () => ({
  __esModule: true,
  default: () => null,
}));

function renderAuth(props = {}) {
  return render(
    <MemoryRouter>
      <Auth {...props} />
    </MemoryRouter>,
  );
}

test("aba Entrar ativa por padrão renderiza apenas email e senha", () => {
  renderAuth();
  expect(screen.queryByLabelText(/nome de exibição/i)).not.toBeInTheDocument();
  expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
});

test("defaultMode=register renderiza os três campos", () => {
  renderAuth({ defaultMode: "register" });
  expect(screen.getByLabelText(/nome de exibição/i)).toBeInTheDocument();
});

test("clicar na aba Cadastrar troca o formulário para registro", async () => {
  const user = userEvent.setup();
  renderAuth();

  expect(screen.queryByLabelText(/nome de exibição/i)).not.toBeInTheDocument();

  await user.click(screen.getByRole("tab", { name: /cadastrar/i }));

  expect(screen.getByLabelText(/nome de exibição/i)).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: /cadastrar/i })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("voltar para a aba Entrar oculta o campo de nome de exibição", async () => {
  const user = userEvent.setup();
  renderAuth({ defaultMode: "register" });

  expect(screen.getByLabelText(/nome de exibição/i)).toBeInTheDocument();

  await user.click(screen.getByRole("tab", { name: /entrar/i }));

  expect(screen.queryByLabelText(/nome de exibição/i)).not.toBeInTheDocument();
});

test("e-mail e senha permanecem ao trocar de aba; nome de exibição reseta", async () => {
  const user = userEvent.setup();
  renderAuth({ defaultMode: "register" });

  await user.type(screen.getByLabelText(/nome de exibição/i), "Arthur");
  await user.type(screen.getByLabelText(/e-mail/i), "user@example.com");
  await user.type(screen.getByLabelText(/senha/i), "senha1234");

  await user.click(screen.getByRole("tab", { name: /entrar/i }));
  expect(screen.getByLabelText(/e-mail/i)).toHaveValue("user@example.com");
  expect(screen.getByLabelText(/senha/i)).toHaveValue("senha1234");

  await user.click(screen.getByRole("tab", { name: /cadastrar/i }));
  expect(screen.getByLabelText(/nome de exibição/i)).toHaveValue("");
  expect(screen.getByLabelText(/e-mail/i)).toHaveValue("user@example.com");
});
