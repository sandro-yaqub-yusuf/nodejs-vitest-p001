import { Agendamento } from '../entities/agendamento';
import { AgendamentoRepository } from '../repositories/agendamento-repository';

interface AgendamentoRequest {
  cliente: string,
  dataInicio: Date,
  dataFim: Date
}

type AgendamentoResponse = Agendamento;

export class CriarAgendamento {
  constructor(private agendamentoRepository: AgendamentoRepository) {}

  async execute(req: AgendamentoRequest): Promise<AgendamentoResponse> {
    const verDataConflito = await this.agendamentoRepository.buscarDataConflito(req.dataInicio, req.dataFim);
    
    if (verDataConflito) { throw new Error('Existe outro agendamento dentro deste períido !'); }

    const agendamento = new Agendamento(req);

    await this.agendamentoRepository.criar(agendamento);

    return agendamento;
  }
}
