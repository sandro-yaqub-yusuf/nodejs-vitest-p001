import { Agendamento } from '../entities/agendamento';

export interface AgendamentoRepository {
  buscarDataConflito(dataInicio: Date, dataFim: Date): Promise<Agendamento | null>;
  criar(agendamento: Agendamento): Promise<void>;
}
