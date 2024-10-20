import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FuncionarioService } from '../../../services/funcionario.service';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-ver-solicitacoes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, BreadcrumbComponent],
  templateUrl: './ver-solicitacoes.component.html',
  styleUrls: ['./ver-solicitacoes.component.scss'],
})
export class VerSolicitacoesComponent implements OnInit {
  constructor(
    private router: Router,
    private funcionarioService: FuncionarioService
  ) {}

  paths = [
    { label: 'Início', path: '/inicio/funcionarios' },
    { label: 'Todas as solicitações', path: '' },
  ]

  solicitacoes: any[] = [];
  filteredSolicitacoes: any[] = [];

  filterType: string = 'todos';

  today: Date = new Date();
  todayStr = this.today.toISOString().split('T')[0];
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
    this.solicitacoes = this.listarTodasSolicitacoes();

    if (this.solicitacoes.length) {
      this.solicitacoes.sort((a, b) => {
        const dateA = new Date(a.dtHrCriacao).getTime();
        const dateB = new Date(b.dtHrCriacao).getTime();
        return dateA - dateB;
      });
      this.filteredSolicitacoes = JSON.parse(JSON.stringify(this.solicitacoes));

      this.calendarInicio =
        this.solicitacoes[0].dtHrCriacao.split('T')[0] || '2024-01-01';
      this.calendarFim = this.todayStr;
    }
  }

  listarTodasSolicitacoes() {
    return this.funcionarioService.listarTodasSolicitacoes();
  }

  goTo(solicitacao: any) {
    if (solicitacao.estadoAtual === 'aberta') {
      this.router.navigate(['/solicitacao/orcar', solicitacao.id]);
    } else if (solicitacao.estadoAtual === 'aprovada') {
      this.router.navigate(['/solicitacao/resolver', solicitacao.id]);
    } else if (solicitacao.estadoAtual === 'redirecionada') {
      this.router.navigate(['/solicitacao/resolver', solicitacao.id]);
    } else if (solicitacao.estadoAtual === 'paga') {
      this.router.navigate(['/solicitacao/finalizar', solicitacao.id]);
    }
  }

  applyDateFilter() {
    let start = new Date();
    let end = new Date();

    if (this.filterType === 'hoje') {
      this.calendarInicio = this.todayStr;
      this.calendarFim = this.todayStr;
    } else if (this.filterType === 'todos') {
      this.calendarInicio =
        this.solicitacoes[0].dtHrCriacao.split('T')[0] || '2024-01-01';
      this.calendarFim = this.todayStr;
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
