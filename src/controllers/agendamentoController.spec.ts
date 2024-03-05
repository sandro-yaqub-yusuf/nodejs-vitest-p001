import { describe, expect, it } from 'vitest';
import { getFutureDate } from '../tests/utils/get-future-date';
import { Agendamento } from '../entities/agendamento';
import { AgendamentoRepositoryInMemory } from '../repositories/in-memory/agendamento-repository-in-memory';
import { CriarAgendamento } from './agendamentoController';

describe('Criar um Agendamento...', () => {
  it('Deveria ser possível criar um Agendamento...', () => {
    const agendamentoRepository = new AgendamentoRepositoryInMemory();
    const criarAgendamento = new CriarAgendamento(agendamentoRepository);
    const dataInicio = getFutureDate('2024-03-01');
    const dataFim = getFutureDate('2024-03-03');

    expect(criarAgendamento.execute({
      cliente: 'Fulano',
      dataInicio,
      dataFim
    })).resolves.toBeInstanceOf(Agendamento);
  });

  it('Não deveria criar um Agendamento com datas conflitantes...', async () => {
    const agendamentoRepository = new AgendamentoRepositoryInMemory();
    const criarAgendamento = new CriarAgendamento(agendamentoRepository);
    const dataInicio = getFutureDate('2024-03-01');
    const dataFim = getFutureDate('2024-03-04');

    await criarAgendamento.execute({
      cliente: 'Fulano',
      dataInicio,
      dataFim
    });

    expect(criarAgendamento.execute({
      cliente: 'Beltrano',
      dataInicio: getFutureDate('2024-03-02'),
      dataFim: getFutureDate('2024-03-05')
    })).rejects.toBeInstanceOf(Error);

    expect(criarAgendamento.execute({
      cliente: 'Ciclano',
      dataInicio: getFutureDate('2024-02-29'),
      dataFim: getFutureDate('2024-03-03')
    })).rejects.toBeInstanceOf(Error);

    expect(criarAgendamento.execute({
      cliente: 'Deltrano',
      dataInicio: getFutureDate('2024-02-29'),
      dataFim: getFutureDate('2024-03-05')
    })).rejects.toBeInstanceOf(Error);

    expect(criarAgendamento.execute({
      cliente: 'Geltrano',
      dataInicio: getFutureDate('2024-03-02'),
      dataFim: getFutureDate('2024-03-04')
    })).rejects.toBeInstanceOf(Error);
  });
});
