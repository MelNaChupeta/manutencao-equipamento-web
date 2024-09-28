import { EstadoSolicitacao } from "./estadoSolicitacao";
import { Movimentacao } from "./movimentacao";
import { TipoEquipamento } from "./tipoEquipamento";

export class Solicitacao {
    id?: number;
    equipamento?: string;
    descricaoEquipamento?: string;
    categoria?: TipoEquipamento;
    dtHrCriacao?: Date;
    descricaoProblema?: string;
    estadoAtual?: EstadoSolicitacao;
    historicoMovimentacao?: Movimentacao[];

}