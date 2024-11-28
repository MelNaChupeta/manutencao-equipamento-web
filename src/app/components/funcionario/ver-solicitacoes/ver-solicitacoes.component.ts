import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FuncionarioService } from '../../../services/funcionario.service';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { EstadoSolicitacao } from '../../../models';
import { ModalService } from '../../../services/modal.service';
import { ProgressService } from '../../../services/progress.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { ErrorModalComponent } from '../../common/modal/error-modal/error-modal.component';

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
    private funcionarioService: FuncionarioService,
    private solicitacaoService: SolicitacaoService,
    private modalService: ModalService,
    private progressBarService :ProgressService
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
    this.applyDateFilter();
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
    let params:any = {};
    if (this.filterType === 'hoje') {
      params.hoje = true;
    } else if (this.filterType === 'todos') {
      /*this.calendarInicio =
        this.solicitacoes[0].dtHrCriacao.split('T')[0] || '2024-01-01';
      this.calendarFim = this.todayStr;*/
      params.todas = true;
    }else{
      params.dataAberturaInicial = this.calendarInicio
      params.dataAberturaFinal = this.calendarFim
    }


    /*this.filteredSolicitacoes = JSON.parse(JSON.stringify(this.solicitacoes));

    this.filteredSolicitacoes = this.filteredSolicitacoes.filter((item) => {
      const data = new Date(item.dtHrCriacao);
      return data <= end && data >= start;
    });*/

    this.solicitacaoService.buscarPorFiltros(params).subscribe({
      next: (response) => {
          this.progressBarService.hide();
          this.filteredSolicitacoes = response;
      },
      error: (response) => {
        let message = response.error?.message ? response.error?.message : "Erro ao buscar s"
        this.progressBarService.hide();
        this.modalService.open(ErrorModalComponent, {
          title:"Atenção",
          body:`<p>${message}</p>`
        });  
      }
    });
    
  }
}
