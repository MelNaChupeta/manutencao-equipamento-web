import { Categoria, Client, Funcionario } from ".";
import { Orcamento } from "../solicitacoes";
import { EstadoSolicitacao } from "./estadoSolicitacao";
import { Movimentacao } from "./movimentacao";

export class Solicitacao {
    id!: Number;
    equipamento?: string;
    descricaoEquipamento?: string;
    categoria?: Categoria;
    cliente?: Client;
    funcionario?:Funcionario;
    dtHrCriacao?: Date;
    descricaoProblema?: string;
    descricaoManutencao?:string;
    orientacaoCliente?:string;
    estadoAtual?: EstadoSolicitacao;
    valorOrcamento?:number
    justificativaRejeicao?:string;
    orcamento?:Orcamento
    historicoMovimentacao?: Movimentacao[];
   
}