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
      estadoAtual: 'Aberta',
      historicoMovimentacao: [
        {
          dtHrMovimentacao:
            'Thu Sep 12 2024 01:35:21 GMT-0300 (Brasilia Standard Time)',
          descricaoMovimentacao: 'Aberta',
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
      estadoAtual: 'Orçada',
      historicoMovimentacao: [
        {
          dtHrMovimentacao:
            'Mon Sep 09 2024 14:55:09 GMT-0300 (Brasilia Standard Time)',
          descricaoMovimentacao: 'Aberta',
        },
        {
          dtHrMovimentacao:
            'Wed Sep 11 2024 09:51:54 GMT-0300 (Brasilia Standard Time)',
          descricaoMovimentacao: 'Orçada',
        },
      ],
    },
  ];
}
