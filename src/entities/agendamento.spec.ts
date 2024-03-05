import { expect, test } from 'vitest';
import { getFutureDate } from '../tests/utils/get-future-date';
import { Agendamento } from './agendamento';

test('Criar um agendamento', () => {
  const dataInicio = getFutureDate('2024-03-01');
  const dataFim = getFutureDate('2024-03-03');

  const agendamento = new Agendamento({
    cliente: 'Fulano',
    dataInicio,
    dataFim
  });

  expect(agendamento).toBeInstanceOf(Agendamento);
  expect(agendamento.cliente).toEqual('Fulano');
});

test('Não pode criar um agendamento com data fim anterior a data início', () => {
  const dataInicio = getFutureDate('2024-03-01');
  const dataFim = getFutureDate('2024-02-29');

  expect(() => {
    return new Agendamento({
      cliente: 'Fulano',
      dataInicio,
      dataFim
    });
  }).toThrow();
});

test('Não pode criar um agendamento com data inicial anterior a data atual', () => {
  const dataInicio = new Date();
  const dataFim = new Date();

  dataFim.setDate(dataInicio.getDate() - 1);
  dataFim.setDate(dataFim.getDate() + 3);

  expect(() => {
    return new Agendamento({
      cliente: 'Fulano',
      dataInicio,
      dataFim
    });
  }).toThrow();
});
