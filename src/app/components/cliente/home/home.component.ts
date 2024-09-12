import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
      categoria: 'Notebook/laptop',
      dtHrCriacao: 'Thu Sep 12 2024 01:35:21 GMT-0300 (Brasilia Standard Time)',
      descricaoProblema: 'Derrubou líquido, agora o notebook não liga mais.',
      estadoAtual: 'aberta',
      historicoMovimentacao: [
        {
          dtHrMovimentacao:
            'Thu Sep 12 2024 01:35:21 GMT-0300 (Brasilia Standard Time)',
          descricaoMovimentacao: 'aberta',
        },
      ],
    },
    {
      id: 2,
      equipamento: 'Celular iPhone 12',
      descricaoEquipamento: 'Celular pessoal, 128GB, ano 2021',
      categoria: 'Celular',
      dtHrCriacao: 'Mon Sep 09 2024 14:55:09 GMT-0300 (Brasilia Standard Time)',
      descricaoProblema: 'Tela quebrada.',
      estadoAtual: 'orçada',
      historicoMovimentacao: [
        {
          dtHrMovimentacao:
            'Mon Sep 09 2024 14:55:09 GMT-0300 (Brasilia Standard Time)',
          descricaoMovimentacao: 'aberta',
        },
        {
          dtHrMovimentacao:
            'Wed Sep 11 2024 09:51:54 GMT-0300 (Brasilia Standard Time)',
          descricaoMovimentacao: 'orçada',
        },
      ],
    },
    {
      id: 3,
      equipamento: 'PlayStation 5',
      descricaoEquipamento: 'PlayStation 5 branco com controle DualSense',
      categoria: 'Console de videogame',
      dtHrCriacao: 'Mon Sep 09 2024 14:55:09 GMT-0300 (Brasilia Standard Time)',
      descricaoProblema: 'Conector de tomada com defeito.',
      estadoAtual: 'aprovada',
      historicoMovimentacao: [
        {
          dtHrMovimentacao:
            'Mon Sep 09 2024 14:55:09 GMT-0300 (Brasilia Standard Time)',
          descricaoMovimentacao: 'aberta',
        },
        {
          dtHrMovimentacao:
            'Wed Sep 11 2024 09:51:54 GMT-0300 (Brasilia Standard Time)',
          descricaoMovimentacao: 'orçada',
        },
        {
          dtHrMovimentacao:
            'Wed Sep 12 2024 14:32:04 GMT-0300 (Brasilia Standard Time)',
          descricaoMovimentacao: 'aprovada',
        },
      ],
    },
    {
      id: 4,
      equipamento: 'Samsung Galaxy S23',
      descricaoEquipamento: 'Samsung Galaxy S23 5G 256GB Preto',
      categoria: 'Celular',
      dtHrCriacao: 'Mon Sep 08 2024 12:09:12 GMT-0300 (Brasilia Standard Time)',
      descricaoProblema: 'Caiu na água e não liga mais.',
      estadoAtual: 'rejeitada',
      historicoMovimentacao: [
        {
          dtHrMovimentacao:
            'Wed Sep 08 2024 12:09:12 GMT-0300 (Brasilia Standard Time)',
          descricaoMovimentacao: 'aberta',
        },
        {
          dtHrMovimentacao:
            'Wed Sep 11 2024 16:23:35 GMT-0300 (Brasilia Standard Time)',
          descricaoMovimentacao: 'orçada',
        },
        {
          dtHrMovimentacao:
            'Mon Sep 12 2024 19:53:41 GMT-0300 (Brasilia Standard Time)',
          descricaoMovimentacao: 'rejeitada',
        },
      ],
    },
  ];
}
