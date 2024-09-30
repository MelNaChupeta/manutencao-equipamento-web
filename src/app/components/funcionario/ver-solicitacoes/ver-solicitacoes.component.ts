import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import mockVerSolicitacoes from './mockVerSolicitacoes.json';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ver-solicitacoes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ver-solicitacoes.component.html',
  styleUrls: ['./ver-solicitacoes.component.scss'],
})
export class VerSolicitacoesComponent implements OnInit {
  solicitacoes: any[] = mockVerSolicitacoes;

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
    this.solicitacoes.forEach((solicitacao) => {
      solicitacao.routerLink = this.getRouterLink(solicitacao);
    });
  }

  getRouterLink(solicitacao: any): any[] {
    switch (solicitacao.estadoAtual) {
      case 'aberta':
        return ['/efetuar-orcamento', solicitacao.id];
      case 'aprovada':
      case 'redirecionada':
        return ['/efetuar-manutencao', solicitacao.id];
      case 'paga':
        return ['/finalizar-solicitacao', solicitacao.id];
      default:
        return [];
    }
  }
}
