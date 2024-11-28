import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgOptimizedImage, registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { Client, EstadoSolicitacao, Funcionario, Movimentacao, Solicitacao, User } from '../../../models';
import { ModalOrcamentoAprovadoComponent } from '../../../modal-orcamento-aprovado/modal-orcamento-aprovado.component';
import { ModalOrcamentoRejeitadoComponent } from '../../../modal-orcamento-rejeitado/modal-orcamento-rejeitado.component';

import { ModalPagamentoComponent } from "../../../modal-pagamento/modal-pagamento.component";
import { ModalService } from '../../../services/modal.service';
import { ProgressService } from '../../../services/progress.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { ErrorModalComponent } from '../../common/modal/error-modal/error-modal.component';
import { AlertModalComponent } from '../../common/modal/alert-modal/alert-modal.component';

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
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private solicitacaoService: SolicitacaoService,
    private modalService: ModalService,
    private progressBarService :ProgressService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idSolicitacaoFromRoute = routeParams.get('idSolicitacao');
   
    if(idSolicitacaoFromRoute) {
      this.progressBarService.show();
      const id = parseInt(idSolicitacaoFromRoute);
      this.solicitacaoService.findById(id).subscribe({
        next: (response) => {
          this.progressBarService.hide();
          this.solicitacao = response;
          this.atualizaFase();
        }, error: (response) => {
          this.progressBarService.hide();
          let message = 'Ocorreu um erro ao processar a requisi&ccedil;&atilde;o.';
          
          if(response.error?.message)
            message = response.error?.message;
          
          this.modalService.open(ErrorModalComponent, {
            title: "Erro ao buscar categoria",
            body: `<p>${message}</p>`,
            onClose: () => {
              this.router.navigate(['/inicio/clientes']);
            },
          });
        }
      });
      
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
      case EstadoSolicitacao.arrumada:
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
      this.progressBarService.show();
      this.solicitacaoService.aprovar(this.solicitacao.id).subscribe({
        next: (response) => {
          this.solicitacao = response;
          const valorFormatadoBr = this.currencyPipe.transform(
            this.solicitacao.orcamento?.valorOrcamento,
            'BRL',
            'symbol',
            '1.2-2'
          );
          this.progressBarService.hide();
          this.modalService.open(AlertModalComponent, {
            title: "Sucesso",
            body: `<p>Serviço aprovado no valor ${valorFormatadoBr}</p>`,
            onClose: () => {
              this.router.navigate(['/inicio/clientes']);
            },
          });
          this.atualizaFase();
        }, error: (response) => {
          this.progressBarService.hide();
          let message = 'Ocorreu um erro ao processar a requisi&ccedil;&atilde;o.';
          
          if(response.error?.message)
            message = response.error?.message;
          
          this.modalService.open(ErrorModalComponent, {
            title: "Erro ao aprovar serviço",
            body: `<p>${message}</p>`,
            onClose: () => {
              this.router.navigate(['/inicio/clientes']);
            },
          });
        }
      });
      /*this.solicitacao.estadoAtual = 'aprovada' as EstadoSolicitacao;
      const valorFormatadoBr = this.currencyPipe.transform(
        this.solicitacao.orcamento?.valorOrcamento,
        'BRL',
        'symbol',
        '1.2-2'
      );
      this.mensagemModalOrcamentoAprovado = `Serviço aprovado no valor ${valorFormatadoBr}`;
      this.isModalOrcamentoAprovadoOpen = true;*/
    }
  }

  rejeitarOrcamento() {
    this.isModalOrcamentoRejeitadoOpen = true;
  }

  fechaModalRejeicao() {
    this.isModalOrcamentoRejeitadoOpen = false;
  }

  handleRejeicao(justificativaRejeicao: string) {
    this.progressBarService.show();
    if (this.solicitacao) {
      this.solicitacao.justificativaRejeicao = justificativaRejeicao;
      this.solicitacaoService.rejeitar(this.solicitacao).subscribe({
        next: (response) => {
          this.solicitacao = response;
          this.progressBarService.hide();
          this.modalService.open(AlertModalComponent, {
            title: "Sucesso",
            body: `<p>Serviço rejeitado com sucesso</p>`,
            onClose: () => {
              this.router.navigate(['/inicio/clientes']);
            },
          });
          this.atualizaFase();
        }, error: (response) => {
          this.progressBarService.hide();
          let message = 'Ocorreu um erro ao processar a requisi&ccedil;&atilde;o.';
          
          if(response.error?.message)
            message = response.error?.message;
          
          this.modalService.open(ErrorModalComponent, {
            title: "Erro ao rejeitar serviço",
            body: `<p>${message}</p>`,
          });
        }
      });
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
      this.progressBarService.show();
      this.solicitacaoService.pagar(this.solicitacao.id).subscribe({
        next: (response) => {
          this.solicitacao = response;
          this.progressBarService.hide();
          this.modalService.open(AlertModalComponent, {
            title: "Sucesso",
            body: `<p>Serviço pago com sucesso</p>`,
            onClose: () => {
              this.router.navigate(['/inicio/clientes']);
            },
          });
          this.atualizaFase();
        }, error: (response) => {
          this.progressBarService.hide();
          let message = 'Ocorreu um erro ao processar a requisi&ccedil;&atilde;o.';
          
          if(response.error?.message)
            message = response.error?.message;
          
          this.modalService.open(ErrorModalComponent, {
            title: "Erro ao pagar serviço",
            body: `<p>${message}</p>`,
          });
        }
      });
    }
  }

  getUsuario(): Funcionario | Client {
    if(this.solicitacao?.historicoMovimentacao)
      return this.solicitacao?.historicoMovimentacao[0]?.autorMovimentacao;
    return new User;
  }

  resgatarOrcamento() {
    if (this.solicitacao) {
      this.solicitacaoService.resgatar(this.solicitacao.id).subscribe({
        next: (response) => {
          this.solicitacao = response;
          this.progressBarService.hide();
          this.modalService.open(AlertModalComponent, {
            title: "Sucesso",
            body: `<p>Serviço resgatado com sucesso</p>`,
            
          });
          this.atualizaFase();
        }, error: (response) => {
          this.progressBarService.hide();
          let message = 'Ocorreu um erro ao processar a requisi&ccedil;&atilde;o.';
          
          if(response.error?.message)
            message = response.error?.message;
          
          this.modalService.open(ErrorModalComponent, {
            title: "Erro ao resgatar serviço",
            body: `<p>${message}</p>`,
          });
        }
      });
    }
  }

  pagarOrcamento() {
    if (this.solicitacao) {
      this.solicitacao.estadoAtual = 'paga' as EstadoSolicitacao;
    }
  }

  getHistoricoMovimentacoes(solicitacao: Solicitacao) {
    if(solicitacao) {
      return solicitacao.historicoMovimentacao?.sort((a, b) => {
        return new Date(b.dtHrMovimentacao).getTime() - new Date(a.dtHrMovimentacao).getTime();
      });
    }
    return [];
  }
}
