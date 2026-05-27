import { render, screen, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import Button from '../components/Button/Button';

test('renderiza botão com label', () => {
  render(
    <Button ariaLabel="Voltar">
      <Text>Botão renderizado!</Text>
    </Button>,
  );
  expect(screen.getByLabelText(/voltar/i)).toBeTruthy();
});

test('executa clique', () => {
  const mockFn = jest.fn();
  render(
    <Button ariaLabel="Voltar" onClick={mockFn}>
      <Text>Botão renderizado!</Text>
    </Button>,
  );
  fireEvent.press(screen.getByLabelText(/voltar/i));
  expect(mockFn).toHaveBeenCalled();
});
