import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "../components/AuthForm/AuthForm";
import { login, register } from "../services/authClient";

jest.mock("../services/authClient", () => ({
  login: jest.fn(),
  register: jest.fn(),
}));

beforeEach(() => {
  login.mockReset();
  register.mockReset();
});

test("modo login não renderiza o campo de nome de exibição", () => {
  render(<AuthForm mode="login" onSuccess={() => {}} />);
  expect(screen.queryByLabelText(/nome de exibição/i)).not.toBeInTheDocument();
  expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
});

test("modo register renderiza os três campos", () => {
  render(<AuthForm mode="register" onSuccess={() => {}} />);
  expect(screen.getByLabelText(/nome de exibição/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
});

test("botão de submit fica desabilitado até os campos serem válidos", async () => {
  const user = userEvent.setup();
  render(<AuthForm mode="login" onSuccess={() => {}} />);

  const submit = screen.getByRole("button", { name: /entrar/i });
  expect(submit).toBeDisabled();

  await user.type(screen.getByLabelText(/e-mail/i), "user@example.com");
  expect(submit).toBeDisabled();

  await user.type(screen.getByLabelText(/senha/i), "senha1234");
  expect(submit).toBeEnabled();
});

test("submit em modo login chama login() uma vez com os valores digitados", async () => {
  const user = userEvent.setup();
  login.mockResolvedValueOnce({ accessToken: "tok" });
  const onSuccess = jest.fn();

  render(<AuthForm mode="login" onSuccess={onSuccess} />);

  await user.type(screen.getByLabelText(/e-mail/i), "user@example.com");
  await user.type(screen.getByLabelText(/senha/i), "senha1234");
  await user.click(screen.getByRole("button", { name: /entrar/i }));

  expect(login).toHaveBeenCalledTimes(1);
  expect(login).toHaveBeenCalledWith({
    email: "user@example.com",
    password: "senha1234",
  });
  expect(register).not.toHaveBeenCalled();
  expect(onSuccess).toHaveBeenCalledWith({ accessToken: "tok" });
});

test("submit em modo register chama register() uma vez com os valores digitados", async () => {
  const user = userEvent.setup();
  register.mockResolvedValueOnce({ accessToken: "tok" });
  const onSuccess = jest.fn();

  render(<AuthForm mode="register" onSuccess={onSuccess} />);

  await user.type(screen.getByLabelText(/nome de exibição/i), "Arthur");
  await user.type(screen.getByLabelText(/e-mail/i), "arthur@example.com");
  await user.type(screen.getByLabelText(/senha/i), "senha1234");
  await user.click(screen.getByRole("button", { name: /criar conta/i }));

  expect(register).toHaveBeenCalledTimes(1);
  expect(register).toHaveBeenCalledWith({
    email: "arthur@example.com",
    password: "senha1234",
    displayName: "Arthur",
  });
  expect(login).not.toHaveBeenCalled();
  expect(onSuccess).toHaveBeenCalledWith({ accessToken: "tok" });
});
