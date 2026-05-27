import { render, screen } from '@testing-library/react-native';
import CardPassagem from '../components/CardPassagem/CardPassagem';

test('renderiza dados da passagem', () => {
  const mockDados = {
    ciaAerea: 'LATAM',
    horaPartidaIda: '08:00',
    aeroPartidaIda: 'GIG',
    dataPartidaIda: '22/05/2026',
    horaChegadaIda: '10:00',
    aeroChegadaIda: 'GRU',
    dataChegadaIda: '22/05/2026',
    horaPartidaVolta: '18:00',
    aeroPartidaVolta: 'GRU',
    dataPartidaVolta: '25/05/2026',
    horaChegadaVolta: '20:00',
    aeroChegadaVolta: 'GIG',
    dataChegadaVolta: '25/05/2026',
    paradas: 1,
    valor: 1200,
  };

  render(<CardPassagem dados={mockDados} />);
  expect(screen.getByText('LATAM')).toBeTruthy();
  expect(screen.getByText('08:00')).toBeTruthy();
  expect(screen.getByText('GIG · 22/05/2026')).toBeTruthy();
  expect(screen.getByText('10:00')).toBeTruthy();
  expect(screen.getByText('GRU · 22/05/2026')).toBeTruthy();

  expect(screen.getByText('18:00')).toBeTruthy();
  expect(screen.getByText('GRU · 25/05/2026')).toBeTruthy();
  expect(screen.getByText('20:00')).toBeTruthy();
  expect(screen.getByText('GIG · 25/05/2026')).toBeTruthy();

  expect(screen.getByLabelText('Bagagem porão')).toBeTruthy();
  expect(screen.getByLabelText('Bagagem de mão')).toBeTruthy();

  expect(screen.getByText('1 Parada')).toBeTruthy();
  expect(screen.getByText('R$1200')).toBeTruthy();
});
