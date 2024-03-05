export interface AgendamentoProps {
  cliente: string,
  dataInicio: Date,
  dataFim: Date
}

export class Agendamento {
  private props: AgendamentoProps;  

  get cliente() { return this.props.cliente; }
  get dataInicio() { return this.props.dataInicio; }
  get dataFim() { return this.props.dataFim; }

  constructor (props: AgendamentoProps) {
    this.props = props;

    if (this.dataInicio <= new Date()) { throw new Error('Data inicial inválido !'); }
    if (this.dataFim <= this.dataInicio) { throw new Error('Data final inválido !'); }
  }
}
