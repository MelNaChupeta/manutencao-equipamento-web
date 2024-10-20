import { Cliente, clientes } from './clientes';
import { Funcionario, funcionarios } from './funcionarios';

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
  autorMovimentacao: Funcionario | Cliente;
}

export interface ItemOrcamento {
  nomeItem: string;
  valorUnitario: number;
  quantidadeItem: number;
  valorItem: number;
}
export interface Orcamento {
  valorTotal: number;
  itens: ItemOrcamento[];
  funcionarioOrcador: Funcionario | null;
  aprovado: boolean;
  justificativaRejeicao: string;
}

function calculaDiasDesdeUltimaMov(movimentacoes: Movimentacao[]): number {
  if (movimentacoes && movimentacoes.length > 0) {
    const ultimaMovimentacao = movimentacoes[0].dtHrMovimentacao;
    const hoje = new Date();
    const diferencaTempo = Math.abs(
      hoje.getTime() - new Date(ultimaMovimentacao).getTime()
    );
    return Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));
  } else {
    return 0;
  }
}

export interface Solicitacao {
  id: string;
  equipamento: string;
  descricaoEquipamento: string;
  categoria: TipoEquipamento;
  dtHrCriacao: Date;
  descricaoProblema: string;
  estadoAtual: EstadoSolicitacao;
  historicoMovimentacao: Movimentacao[];
  orcamento: Orcamento;
}

export const solicitacoes: Solicitacao[] = [
  {
    id: '1a',
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
        autorMovimentacao: clientes[0],
      },
    ],
    orcamento: {
      valorTotal: 0,
      itens: [],
      funcionarioOrcador: null,
      aprovado: false,
      justificativaRejeicao: '',
    },
  },
  {
    id: '2',
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
        autorMovimentacao: clientes[0],
      },
      {
        dtHrMovimentacao: new Date(
          'Wed Sep 11 2024 09:51:54 GMT-0300 (Brasilia Standard Time)'
        ),
        estadoMovimentacao: EstadoSolicitacao.orcada,
        autorMovimentacao: funcionarios[0],
      },
    ],
    orcamento: {
      valorTotal: 700.0,
      itens: [
        {
          nomeItem: 'Tela nova original',
          valorUnitario: 700.0,
          quantidadeItem: 1,
          valorItem: 700.0,
        },
      ],
      funcionarioOrcador: funcionarios[0],
      aprovado: false,
      justificativaRejeicao: '',
    },
  },
  {
    id: '3',
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
        autorMovimentacao: clientes[1],
      },
      {
        dtHrMovimentacao: new Date(
          'Wed Sep 11 2024 09:51:54 GMT-0300 (Brasilia Standard Time)'
        ),
        estadoMovimentacao: EstadoSolicitacao.orcada,
        autorMovimentacao: funcionarios[1],
      },
      {
        dtHrMovimentacao: new Date(
          'Wed Sep 12 2024 14:32:04 GMT-0300 (Brasilia Standard Time)'
        ),
        estadoMovimentacao: EstadoSolicitacao.aprovada,
        autorMovimentacao: clientes[1],
      },
    ],
    orcamento: {
      valorTotal: 400.0,
      itens: [
        {
          nomeItem: 'Nova fiação',
          valorUnitario: 250.0,
          quantidadeItem: 1,
          valorItem: 250.0,
        },
        {
          nomeItem: 'Novo conector',
          valorUnitario: 150.0,
          quantidadeItem: 1,
          valorItem: 150.0,
        },
      ],
      funcionarioOrcador: funcionarios[1],
      aprovado: true,
      justificativaRejeicao: '',
    },
  },
  {
    id: '4',
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
        autorMovimentacao: clientes[2],
      },
      {
        dtHrMovimentacao: new Date(
          'Wed Sep 11 2024 16:23:35 GMT-0300 (Brasilia Standard Time)'
        ),
        estadoMovimentacao: EstadoSolicitacao.orcada,
        autorMovimentacao: funcionarios[1],
      },
      {
        dtHrMovimentacao: new Date(
          'Mon Sep 12 2024 19:53:41 GMT-0300 (Brasilia Standard Time)'
        ),
        estadoMovimentacao: EstadoSolicitacao.rejeitada,
        autorMovimentacao: clientes[2],
      },
    ],
    orcamento: {
      valorTotal: 2700.0,
      itens: [
        {
          nomeItem: 'Tela nova original',
          valorUnitario: 700.0,
          quantidadeItem: 1,
          valorItem: 700.0,
        },
        {
          nomeItem: 'Placa mãe nova',
          valorUnitario: 2000.0,
          quantidadeItem: 1,
          valorItem: 2000.0,
        },
      ],
      funcionarioOrcador: funcionarios[1],
      aprovado: false,
      justificativaRejeicao: '',
    },
  },
  {
    id: '5',
    equipamento: 'iPad mini 6ª geração',
    descricaoEquipamento:
      'iPad mini 6ª geração A15 Bionic 8,3" Wi-Fi 64GB Estelar',
    categoria: TipoEquipamento.tablet,
    dtHrCriacao: new Date(
      'Mon Sep 02 2024 15:11:09 GMT-0300 (Brasilia Standard Time)'
    ),
    descricaoProblema: 'Conector não carrega',
    estadoAtual: EstadoSolicitacao.aguardandoPagamento,
    historicoMovimentacao: [
      {
        dtHrMovimentacao: new Date(
          'Mon Sep 02 2024 15:11:09 GMT-0300 (Brasilia Standard Time)'
        ),
        estadoMovimentacao: EstadoSolicitacao.aberta,
        autorMovimentacao: clientes[3],
      },
      {
        dtHrMovimentacao: new Date(
          'Wed Sep 04 2024 16:23:35 GMT-0300 (Brasilia Standard Time)'
        ),
        estadoMovimentacao: EstadoSolicitacao.orcada,
        autorMovimentacao: funcionarios[1],
      },
      {
        dtHrMovimentacao: new Date(
          'Wed Sep 04 2024 19:53:41 GMT-0300 (Brasilia Standard Time)'
        ),
        estadoMovimentacao: EstadoSolicitacao.aprovada,
        autorMovimentacao: clientes[3],
      },
      {
        dtHrMovimentacao: new Date(
          'Mon Sep 09 2024 10:31:54 GMT-0300 (Brasilia Standard Time)'
        ),
        estadoMovimentacao: EstadoSolicitacao.aguardandoPagamento,
        autorMovimentacao: funcionarios[1],
      },
    ],
    orcamento: {
      valorTotal: 500.0,
      itens: [
        {
          nomeItem: 'Reparo do conector lightning',
          valorUnitario: 500.0,
          quantidadeItem: 1,
          valorItem: 500.0,
        },
      ],
      funcionarioOrcador: funcionarios[1],
      aprovado: true,
      justificativaRejeicao: '',
    },
  },
];
