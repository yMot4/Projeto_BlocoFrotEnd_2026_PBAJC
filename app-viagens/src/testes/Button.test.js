import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../components/Button";

test("renderiza botão", ()=>{
    render(COLOCAR O BUTTON INTEIRO AQUI);
    expect(screen.getByRole("button", {name: /voltar/i})).toBeInTheDocument(); //i faz ignorar maiusculas e minusculas
});

test("executa clique", async()=>{
    const mockFn = jest.fn();
    render (BOTAO INTEIRO COM NAME E ONCLICK);
    const botao = screen.getByRole("button");
    await userEvent.click(botao);
    expect(mockFn).toHaveBeenCalled();
});