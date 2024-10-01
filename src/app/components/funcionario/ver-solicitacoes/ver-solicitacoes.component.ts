import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import mockVerSolicitacoes from './mockVerSolicitacoes.json';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule aqui

@Component({
  selector: 'app-ver-solicitacoes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './ver-solicitacoes.component.html',
  styleUrls: ['./ver-solicitacoes.component.scss'],
})
export class VerSolicitacoesComponent implements OnInit {
  constructor(private router: Router) {}

  solicitacoes: any[] = mockVerSolicitacoes;
  filteredSolicitacoes: any[] = mockVerSolicitacoes;

  filterType: string = 'todos';

  today: Date = new Date();
  calendarInicio = '';
  calendarFim = '';

  estadoAcoes: { [key: string]: string } = {
    aberta: 'Efetuar Orçamento',
    aprovada: 'Efetuar Manutenção',
    redirecionada: 'Efetuar Manutenção',
    paga: 'Finalizar Solicitação',
  };

  estadoCores: { [key: string]: string } = {
    aberta: 'bg-gray-500',
    orcada: 'bg-amber-900',
    rejeitada: 'bg-red-600',
    aprovada: 'bg-yellow-300',
    redirecionada: 'bg-purple-500',
    aguardandoPagamento: 'bg-blue-500',
    paga: 'bg-orange-400',
    finalizada: 'bg-green-500',
  };

  ngOnInit(): void {
    this.solicitacoes.sort((a, b) => {
      const dateA = new Date(a.dtHrCriacao).getTime();
      const dateB = new Date(b.dtHrCriacao).getTime();
      return dateA - dateB;
    });
    this.filteredSolicitacoes = JSON.parse(JSON.stringify(this.solicitacoes));

    this.calendarInicio =
      this.solicitacoes[0].dtHrCriacao.split('T')[0] || '2024-01-01';
    this.calendarFim = this.today.toISOString().split('T')[0];
  }

  goTo(solicitacao: any) {
    if (solicitacao.estadoAtual === 'aberta') {
      this.router.navigate(['/efetuar-orcamento', solicitacao.id]);
    } else if (solicitacao.estadoAtual === 'aprovada') {
      this.router.navigate(['/efetuar-manutencao', solicitacao.id]);
    } else if (solicitacao.estadoAtual === 'redirecionada') {
      this.router.navigate(['/efetuar-manutencao', solicitacao.id]);
    } else if (solicitacao.estadoAtual === 'paga') {
      this.router.navigate(['/finalizar-solicitacao', solicitacao.id]);
    }
  }

  applyDateFilter() {
    let start = new Date();
    let end = new Date();

    if (this.filterType === 'hoje') {
      this.calendarInicio = this.today.toISOString().split('T')[0];
      this.calendarFim = this.today.toISOString().split('T')[0];
    } else if (this.filterType === 'todos') {
      this.calendarInicio =
        this.solicitacoes[0].dtHrCriacao.split('T')[0] || '2024-01-01';
      this.calendarFim = this.today.toISOString().split('T')[0];
    }

    start = new Date(`${this.calendarInicio}T00:00:00`);
    end = new Date(`${this.calendarFim}T23:59:59`);

    this.filteredSolicitacoes = JSON.parse(JSON.stringify(this.solicitacoes));

    this.filteredSolicitacoes = this.filteredSolicitacoes.filter((item) => {
      const data = new Date(item.dtHrCriacao);
      return data <= end && data >= start;
    });
  }
}
