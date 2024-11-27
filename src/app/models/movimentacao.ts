import { EstadoSolicitacao } from "./estadoSolicitacao";
import { User } from "./user";

export class Movimentacao {
    dtHrMovimentacao: Date;
    estadoMovimentacao: EstadoSolicitacao;
    autorMovimentacao!: User;
    constructor(dtHrMovimentacao:Date,estadoMovimentacao:EstadoSolicitacao) {
        this.dtHrMovimentacao = dtHrMovimentacao;
        this.estadoMovimentacao = estadoMovimentacao;
    }
}