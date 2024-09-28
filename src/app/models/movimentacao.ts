import { EstadoSolicitacao } from "./estadoSolicitacao";

export class Movimentacao {
    dtHrMovimentacao: Date;
    estadoMovimentacao: EstadoSolicitacao;

    constructor(dtHrMovimentacao:Date,estadoMovimentacao:EstadoSolicitacao) {
        this.dtHrMovimentacao = dtHrMovimentacao;
        this.estadoMovimentacao = estadoMovimentacao;
    }
}