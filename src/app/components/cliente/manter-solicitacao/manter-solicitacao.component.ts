import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Solicitacao, solicitacoes, Movimentacao } from '../../../solicitacoes';
import { NgOptimizedImage, registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { EstadoSolicitacao } from '../../../models';

registerLocaleData(localePT);

@Component({
  selector: 'app-manter-solicitacao',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FontAwesomeModule],
  templateUrl: './manter-solicitacao.component.html',
  styleUrl: './manter-solicitacao.component.scss',
})
export class ManterSolicitacaoComponent implements OnInit {
  solicitacao?: Solicitacao;
  solicitacoes = solicitacoes;
  movimentacao?: Movimentacao;
  faCircleCheck = faCircleCheck;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idSolicitacaoFromRoute = routeParams.get('idSolicitacao');
    this.solicitacao = solicitacoes.find(
      (solicitacao) => solicitacao.id === idSolicitacaoFromRoute
    );
    if (!this.solicitacao) {
      console.error(`Solicitação #${idSolicitacaoFromRoute} não encontrada!`);
    }
  }
  imagemControle = '../../../../assets/controle.png';

  getBotoesAcaoCliente(): { textoBotao: string; acao: () => void }[] {
    if (!this.solicitacao) {
      return [];
    }
    switch (this.solicitacao.estadoAtual) {
      case EstadoSolicitacao.aberta:
        return [];
      case EstadoSolicitacao.orcada:
        return [
          {
            textoBotao: 'Aprovar orçamento',
            acao: () => this.aprovarOrcamento(),
          },
          { textoBotao: 'Rejeitar orçamento', acao: () => this.rejeitarOrcamento() },
        ];
      case EstadoSolicitacao.rejeitada:
        return [
          { textoBotao: 'Resgatar solicitação', acao: () => this.resgatarOrcamento() },
        ];
      case EstadoSolicitacao.aprovada:
        return [];
      case EstadoSolicitacao.aguardandoPagamento:
        return [{ textoBotao: 'Pagar serviço', acao: () => this.pagarOrcamento() }];
      case EstadoSolicitacao.paga:
        return [];
      default:
        return [];
    }
  }

  aprovarOrcamento() {
    if (this.solicitacao) {
      this.solicitacao.estadoAtual = 'aprovada' as EstadoSolicitacao;
    }
  }

  rejeitarOrcamento() {
    if (this.solicitacao) {
      this.solicitacao.estadoAtual = 'rejeitada' as EstadoSolicitacao;
    }
  }

  resgatarOrcamento() {
    if (this.solicitacao) {
      this.solicitacao.estadoAtual = 'orcada' as EstadoSolicitacao;
    }
  }

  pagarOrcamento() {
    if (this.solicitacao) {
      this.solicitacao.estadoAtual = 'paga' as EstadoSolicitacao;
    }
  }
}
