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

export interface Funcionario {
  nome: string;
  email: string;
  dataNascimento: Date;
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
      },
    ],
    orcamento: {
      valorTotal: 0,
      itens: [],
      funcionarioOrcador: null,
      aprovado: false,
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
      },
      {
        dtHrMovimentacao: new Date(
          'Wed Sep 11 2024 09:51:54 GMT-0300 (Brasilia Standard Time)'
        ),
        estadoMovimentacao: EstadoSolicitacao.orcada,
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
      funcionarioOrcador: null,
      aprovado: false,
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
      funcionarioOrcador: null,
      aprovado: true,
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
      funcionarioOrcador: null,
      aprovado: false,
    },
  },
];
