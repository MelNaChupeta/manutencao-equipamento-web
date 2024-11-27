import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { ProgressService } from '../../../services/progress.service';
import { ModalService } from '../../../services/modal.service';
import { ErrorModalComponent } from '../../common/modal/error-modal/error-modal.component';
import { EstadoSolicitacao, Solicitacao } from '../../../models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  solicitacoes:Solicitacao[] = [];

  constructor(
    private router: Router,
    private solicitacaoService: SolicitacaoService,
    private modalService: ModalService,
    private progressBarService :ProgressService
  ) {}
  ngOnInit(): void {
    this.buscarSolicitacoes();
  }

  shouldShowActionButton(solicitacao: Solicitacao): boolean {
    return (
      solicitacao.estadoAtual === EstadoSolicitacao.orcada ||
      solicitacao.estadoAtual === EstadoSolicitacao.rejeitada ||
      solicitacao.estadoAtual === EstadoSolicitacao.arrumada
    );
  }

  getActionText(solicitacao: Solicitacao): string {
    switch (solicitacao.estadoAtual) {
      case 'aberta':
        return '';
      case 'orçada':
        return 'Aprovar';
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

  calculaDiasDesdeUltimaMovimentacao(solicitacao: Solicitacao): number {
    let movimentacoes = solicitacao.historicoMovimentacao;
    if (movimentacoes && movimentacoes.length > 0) {
      const ultimaMovimentacao = new Date(movimentacoes[0].dtHrMovimentacao);
      const hoje = new Date();
      
      const diferencaTempo = Math.abs(hoje.getTime() - ultimaMovimentacao.getTime());
      
      const diferencaDias = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));
      
      return diferencaDias;
    }
    return 0;
  }

  buscarSolicitacoes() {
    this.solicitacaoService.buscarTodas().subscribe({
      next: (response) => {
          this.progressBarService.hide();
          this.solicitacoes = response;
      },
      error: (error) => {
        this.progressBarService.hide();
        this.modalService.open(ErrorModalComponent, {
          title:"Atenção",
          body:"Erro ao buscar categorias"
        });  
      }
    });
  }
}
