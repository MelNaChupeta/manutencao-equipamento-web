import { Categoria } from ".";
import { Orcamento } from "../solicitacoes";
import { EstadoSolicitacao } from "./estadoSolicitacao";
import { Movimentacao } from "./movimentacao";

export class Solicitacao {
    id!: Number;
    equipamento?: string;
    descricaoEquipamento?: string;
    categoria?: Categoria;
    dtHrCriacao?: Date;
    descricaoProblema?: string;
    estadoAtual?: EstadoSolicitacao;
    valorOrcamento?:number
    justificativaRejeicao?:string;
    orcamento?:Orcamento
    historicoMovimentacao?: Movimentacao[];
    public Solicitacao(id:number){
        this.id = id;
    }
}