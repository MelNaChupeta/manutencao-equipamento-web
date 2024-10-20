import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Solicitacao, solicitacoes, Movimentacao } from '../../../solicitacoes';
import { NgOptimizedImage, registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { EstadoSolicitacao } from '../../../models';
import { ModalOrcamentoAprovadoComponent } from '../../../modal-orcamento-aprovado/modal-orcamento-aprovado.component';
import { ModalOrcamentoRejeitadoComponent } from '../../../modal-orcamento-rejeitado/modal-orcamento-rejeitado.component';
import { Funcionario } from '../../../funcionarios';
import { Cliente } from '../../../clientes';
import { ModalPagamentoComponent } from "../../../modal-pagamento/modal-pagamento.component";

registerLocaleData(localePT);

@Component({
  selector: 'app-manter-solicitacao',
  standalone: true,
  providers: [CurrencyPipe],
  imports: [
    CommonModule,
    NgOptimizedImage,
    FontAwesomeModule,
    ModalOrcamentoAprovadoComponent,
    ModalOrcamentoRejeitadoComponent,
    ModalPagamentoComponent
],
  templateUrl: './manter-solicitacao.component.html',
  styleUrl: './manter-solicitacao.component.scss',
})
export class ManterSolicitacaoComponent implements OnInit {
  solicitacao?: Solicitacao;
  solicitacoes = solicitacoes;
  movimentacao?: Movimentacao;
  faCircleCheck = faCircleCheck;
  isModalOrcamentoAprovadoOpen = false;
  isModalOrcamentoRejeitadoOpen = false;
  isModalPagamentoOpen = false;
  mensagemModalOrcamentoAprovado = '';

  fases = [
    { nome: EstadoSolicitacao.aberta, completa: false },
    { nome: EstadoSolicitacao.orcada, completa: false },
    { nome: EstadoSolicitacao.aprovada, completa: false },
    { nome: EstadoSolicitacao.rejeitada, completa: false },
    { nome: EstadoSolicitacao.redirecionada, completa: false },
    { nome: EstadoSolicitacao.arrumada, completa: false },
    { nome: EstadoSolicitacao.aguardandoPagamento, completa: false },
    { nome: EstadoSolicitacao.paga, completa: false },
    { nome: EstadoSolicitacao.finalizada, completa: false },
  ];

  constructor(
    private route: ActivatedRoute,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idSolicitacaoFromRoute = routeParams.get('idSolicitacao');
    this.solicitacao = solicitacoes.find(
      (solicitacao) => solicitacao.id === idSolicitacaoFromRoute
    );
    if (!this.solicitacao) {
      console.error(`Solicitação #${idSolicitacaoFromRoute} não encontrada!`);
    }
    this.atualizaFase();
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
            textoBotao: 'Rejeitar orçamento',
            acao: () => this.rejeitarOrcamento(),
          },
          {
            textoBotao: 'Aprovar orçamento',
            acao: () => this.aprovarOrcamento(),
          },
        ];
      case EstadoSolicitacao.rejeitada:
        return [
          {
            textoBotao: 'Resgatar solicitação',
            acao: () => this.resgatarOrcamento(),
          },
        ];
      case EstadoSolicitacao.aprovada:
        return [];
      case EstadoSolicitacao.aguardandoPagamento:
        return [
          { textoBotao: 'Pagar serviço', acao: () => this.pagarServico(this.solicitacao!) },
        ];
      case EstadoSolicitacao.paga:
        return [];
      default:
        return [];
    }
  }

  atualizaFase() {
    for (let i = 0; i < this.fases.length; i++) {
      if (this.fases[i].nome === this.solicitacao?.estadoAtual) {
        this.fases[i].completa = true;
        break;
      } else if (
        this.solicitacao?.estadoAtual === EstadoSolicitacao.rejeitada
      ) {
        if (this.fases[i].nome === EstadoSolicitacao.orcada) {
          this.fases[i].completa = true;
          break;
        }
      } else {
        this.fases[i].completa = true;
      }
    }
  }

  aprovarOrcamento() {
    if (this.solicitacao) {
      this.solicitacao.estadoAtual = 'aprovada' as EstadoSolicitacao;
      const valorFormatadoBr = this.currencyPipe.transform(
        this.solicitacao.orcamento.valorTotal,
        'BRL',
        'symbol',
        '1.2-2'
      );
      this.mensagemModalOrcamentoAprovado = `Serviço aprovado no valor ${valorFormatadoBr}`;
      this.isModalOrcamentoAprovadoOpen = true;
    }
  }

  rejeitarOrcamento() {
    this.isModalOrcamentoRejeitadoOpen = true;
  }

  fechaModalRejeicao() {
    this.isModalOrcamentoRejeitadoOpen = false;
  }

  handleRejeicao(justificativaRejeicao: string) {
    if (this.solicitacao) {
      this.solicitacao.estadoAtual = 'rejeitada' as EstadoSolicitacao;
      this.solicitacao.orcamento.justificativaRejeicao = justificativaRejeicao;
    }
  }

  fechaModalPagamento() {
    this.isModalPagamentoOpen = false;
  }

  pagarServico(solicitacao: Solicitacao) {
    this.solicitacao = solicitacao;
    this.isModalPagamentoOpen = true;
  }

  handlePagamento() {
    if (this.solicitacao) {
      this.solicitacao.estadoAtual = 'paga' as EstadoSolicitacao;
      const novaMovimentacao: Movimentacao = {
        dtHrMovimentacao: new Date(),
        estadoMovimentacao: EstadoSolicitacao.paga,
        autorMovimentacao: this.getUsuario(),
      };
      this.solicitacao.historicoMovimentacao.push(novaMovimentacao);
    }
  }

  getUsuario(): Funcionario | Cliente {
    return this.solicitacao?.historicoMovimentacao[0].autorMovimentacao as Funcionario | Cliente;
  }

  resgatarOrcamento() {
    if (this.solicitacao) {
      this.solicitacao.estadoAtual = 'orçada' as EstadoSolicitacao;
    }
  }

  pagarOrcamento() {
    if (this.solicitacao) {
      this.solicitacao.estadoAtual = 'paga' as EstadoSolicitacao;
    }
  }

  getHistoricoMovimentacoes(solicitacao: Solicitacao) {
    return solicitacao.historicoMovimentacao.sort((a, b) => {
      return b.dtHrMovimentacao.getTime() - a.dtHrMovimentacao.getTime();
    });
  }
}
