import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

export interface Solicitacao {
  id: number;
  equipamento: string;
  descricaoEquipamento: string;
  categoria: TipoEquipamento;
  dtHrCriacao: Date;
  descricaoProblema: string;
  estadoAtual: EstadoSolicitacao;
  historicoMovimentacao: Movimentacao[];
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  solicitacoes = [
    {
      id: 1,
      equipamento: 'Notebook Dell Latitude 5450',
      descricaoEquipamento: 'Notebook pessoal, 512GB SSD, 32GB RAM, ano 2023',
      categoria: TipoEquipamento.notebook,
      dtHrCriacao: new Date(
        'Thu Sep 12 2024 01:35:21 GMT-0300 (Brasilia Standard Time)'
      ),
      descricaoProblema: 'Derrubou líquido, agora o notebook não liga mais.',
      estadoAtual: EstadoSolicitacao.aberta,
      historicoMovimentacao: [
        {
          dtHrMovimentacao: new Date(
            'Thu Sep 12 2024 01:35:21 GMT-0300 (Brasilia Standard Time)'
          ),
          estadoMovimentacao: EstadoSolicitacao.aberta,
        },
      ],
    },
    {
      id: 2,
      equipamento: 'Celular iPhone 12',
      descricaoEquipamento: 'Celular pessoal, 128GB, ano 2021',
      categoria: TipoEquipamento.celular,
      dtHrCriacao: new Date(
        'Mon Sep 09 2024 14:55:09 GMT-0300 (Brasilia Standard Time)'
      ),
      descricaoProblema: 'Tela quebrada.',
      estadoAtual: EstadoSolicitacao.orcada,
      historicoMovimentacao: [
        {
          dtHrMovimentacao: new Date(
            'Mon Sep 09 2024 14:55:09 GMT-0300 (Brasilia Standard Time)'
          ),
          estadoMovimentacao: EstadoSolicitacao.aberta,
        },
        {
          dtHrMovimentacao: new Date(
            'Wed Sep 11 2024 09:51:54 GMT-0300 (Brasilia Standard Time)'
          ),
          estadoMovimentacao: EstadoSolicitacao.orcada,
        },
      ],
    },
    {
      id: 3,
      equipamento: 'PlayStation 5',
      descricaoEquipamento: 'PlayStation 5 branco com controle DualSense',
      categoria: TipoEquipamento.videogameConsole,
      dtHrCriacao: new Date(
        'Mon Sep 09 2024 14:55:09 GMT-0300 (Brasilia Standard Time)'
      ),
      descricaoProblema: 'Conector de tomada com defeito.',
      estadoAtual: EstadoSolicitacao.aprovada,
      historicoMovimentacao: [
        {
          dtHrMovimentacao: new Date(
            'Mon Sep 09 2024 14:55:09 GMT-0300 (Brasilia Standard Time)'
          ),
          estadoMovimentacao: EstadoSolicitacao.aberta,
        },
        {
          dtHrMovimentacao: new Date(
            'Wed Sep 11 2024 09:51:54 GMT-0300 (Brasilia Standard Time)'
          ),
          estadoMovimentacao: EstadoSolicitacao.orcada,
        },
        {
          dtHrMovimentacao: new Date(
            'Wed Sep 12 2024 14:32:04 GMT-0300 (Brasilia Standard Time)'
          ),
          estadoMovimentacao: EstadoSolicitacao.aprovada,
        },
      ],
    },
    {
      id: 4,
      equipamento: 'Samsung Galaxy S23',
      descricaoEquipamento: 'Samsung Galaxy S23 5G 256GB Preto',
      categoria: TipoEquipamento.celular,
      dtHrCriacao: new Date(
        'Mon Sep 08 2024 12:09:12 GMT-0300 (Brasilia Standard Time)'
      ),
      descricaoProblema: 'Caiu na água e não liga mais.',
      estadoAtual: EstadoSolicitacao.rejeitada,
      historicoMovimentacao: [
        {
          dtHrMovimentacao: new Date(
            'Wed Sep 08 2024 12:09:12 GMT-0300 (Brasilia Standard Time)'
          ),
          estadoMovimentacao: EstadoSolicitacao.aberta,
        },
        {
          dtHrMovimentacao: new Date(
            'Wed Sep 11 2024 16:23:35 GMT-0300 (Brasilia Standard Time)'
          ),
          estadoMovimentacao: EstadoSolicitacao.orcada,
        },
        {
          dtHrMovimentacao: new Date(
            'Mon Sep 12 2024 19:53:41 GMT-0300 (Brasilia Standard Time)'
          ),
          estadoMovimentacao: EstadoSolicitacao.rejeitada,
        },
      ],
    },
  ];

  shouldShowActionButton(solicitacao: Solicitacao): boolean {
    return solicitacao.estadoAtual === EstadoSolicitacao.orcada ||
      solicitacao.estadoAtual === EstadoSolicitacao.rejeitada ||
      solicitacao.estadoAtual === EstadoSolicitacao.arrumada;
  }

  getActionText(solicitacao: Solicitacao): string {
    switch (solicitacao.estadoAtual) {
      case 'aberta':
        return '';
      case 'orçada':
        return 'Aprovar ou rejeitar';
      case 'aprovada':
        return '';
      case 'rejeitada':
        return 'Resgatar';
      case 'arrumada':
        return 'Pagar';
      default:
        return '';
    }
  }
}
