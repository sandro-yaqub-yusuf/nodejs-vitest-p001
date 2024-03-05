import { areIntervalsOverlapping } from 'date-fns';
import { Agendamento } from '../../entities/agendamento';
import { AgendamentoRepository } from '../agendamento-repository';

export class AgendamentoRepositoryInMemory implements AgendamentoRepository {
  public items: Agendamento[] = [];

  async buscarDataConflito(dataInicio: Date, dataFim: Date): Promise<Agendamento | null> {
    const overlappingAgendamento = this.items.find(agendamento => {
      return areIntervalsOverlapping(
        { start: dataInicio, end: dataFim },
        { start: agendamento.dataInicio, end: agendamento.dataFim },
        { inclusive: true }
      );
    })

    if (!overlappingAgendamento) { return null; }

    return overlappingAgendamento;
  }

  async criar(agendamento: Agendamento): Promise<void> {
    this.items.push(agendamento);
  }
}
