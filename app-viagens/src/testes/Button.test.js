import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../components/Button";

test("renderiza botão com icone", ()=>{
    render(
        <Button ariaLabel="Voltar" >
            <ArrowRightStroke rotate={180} size="md" color="white" />
        </Button> 
    );
    expect(screen.getByRole("button", {name: /voltar/i})).toBeInTheDocument(); //regex e o i faz ignorar maiusculas e minusculas
});

test("executa clique", async()=>{
    const mockFn = jest.fn();
    render (
        <Button ariaLabel="Voltar" onClick={mockFn}>
            <ArrowRightStroke rotate={180} size="md" color="white" />
        </Button> 
    );
    const botao = screen.getByRole("button",{name: /voltar/i});
    await userEvent.click(botao);
    expect(mockFn).toHaveBeenCalled();
});