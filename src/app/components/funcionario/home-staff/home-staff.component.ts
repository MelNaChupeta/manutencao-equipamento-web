import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import mockSolicitacoes from './mockSolicitacoes.json';

export enum TipoEquipamento {
  notebook = 'Notebook/laptop',
  desktop = 'Desktop',
  celular = 'Celular',
  tablet = 'Tablet',
  impressora = 'Impressora',
  mouse = 'Mouse',
  teclado = 'Teclado',
  televisao = 'Televisão',
  camera = 'Câmera',
  drone = 'Drone',
  videogameConsole = 'Console de videogame',
  videogameAcessorio = 'Acessório de videogame',
}

export enum EstadoSolicitacao {
  aberta = 'aberta',
  orcada = 'orçada',
  aprovada = 'aprovada',
  rejeitada = 'rejeitada',
  redirecionada = 'redirecionada',
  arrumada = 'arrumada',
  aguardandoPagamento = 'aguardando pagamento',
  paga = 'paga',
  finalizada = 'finalizada',
}

export interface Movimentacao {
  dtHrMovimentacao: Date;
  estadoMovimentacao: EstadoSolicitacao;
}

// OLD:

// export interface Solicitacao {
//   id: number;
//   equipamento: string;
//   descricaoEquipamento: string;
//   categoria: TipoEquipamento;
//   dtHrCriacao: Date;
//   descricaoProblema: string;
//   estadoAtual: EstadoSolicitacao;
//   historicoMovimentacao: Movimentacao[];
// }

export interface Solicitacao {
  id: number;
  datetime: string;
  client: string;
  productDescription: string;
  status: string;
}

@Component({
  selector: 'app-home-staff',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-staff.component.html',
  styleUrl: './home-staff.component.scss',
})
export class HomeStaffComponent {
  solicitacoes = mockSolicitacoes 

  ngOnInit(): void {
    console.log(this.solicitacoes); // Verifique se está mostrando os dados
  }


  // shouldShowActionButton(solicitacao: Solicitacao): boolean {
  //   return solicitacao.estadoAtual === EstadoSolicitacao.orcada ||
  //     solicitacao.estadoAtual === EstadoSolicitacao.rejeitada ||
  //     solicitacao.estadoAtual === EstadoSolicitacao.arrumada;
  // }

  // getActionText(solicitacao: Solicitacao): string {
  //   switch (solicitacao.estadoAtual) {
  //     case 'aberta':
  //       return '';
  //     case 'orçada':
  //       return 'Aprovar ou rejeitar';
  //     case 'aprovada':
  //       return '';
  //     case 'rejeitada':
  //       return 'Resgatar';
  //     case 'arrumada':
  //       return 'Pagar';
  //     default:
  //       return '';
  //   }
  // }
}
