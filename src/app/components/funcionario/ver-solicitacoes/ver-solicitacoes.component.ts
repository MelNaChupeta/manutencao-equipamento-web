import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import mockVerSolicitacoes from './mockVerSolicitacoes.json';



@Component({
  selector: 'app-ver-solicitacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-solicitacoes.component.html',
  styleUrl: './ver-solicitacoes.component.scss'
})
export class VerSolicitacoesComponent {
  solicitacoes = mockVerSolicitacoes;

  estadoAcoes: { [key: string]: string } = {
    aberta: "Efetuar Orçamento",
    aprovada: "Efetuar Manutenção",
    redirecionada: "Efetuar Manutenção",
    paga: "Finalizar Solicitação",
  };
}
