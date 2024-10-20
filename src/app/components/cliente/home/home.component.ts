import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  EstadoSolicitacao,
  Solicitacao,
  solicitacoes,
} from '../../../solicitacoes';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  solicitacoes = [...solicitacoes];

  constructor(private router: Router) {}

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

  calculaDiasDesdeUltimaMovimentacao(solicitacao: Solicitacao): number {
    const movimentacoes = solicitacao.historicoMovimentacao.sort((a, b) => {
      return b.dtHrMovimentacao.getTime() - a.dtHrMovimentacao.getTime();
    });

    if (movimentacoes.length > 0) {
      const ultimaMovimentacao = movimentacoes[0].dtHrMovimentacao;
      const hoje = new Date();
      const diferencaTempo = Math.abs(
        hoje.getTime() - ultimaMovimentacao.getTime()
      );
      return Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));
    }

    return 0;
  }
}
