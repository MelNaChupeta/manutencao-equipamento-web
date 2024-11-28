import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FuncionarioService } from '../../../services/funcionario.service';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { Solicitacao } from '../../../models';
import { ModalService } from '../../../services/modal.service';
import { ProgressService } from '../../../services/progress.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { ErrorModalComponent } from '../../common/modal/error-modal/error-modal.component';
import { AlertModalComponent } from '../../common/modal/alert-modal/alert-modal.component';

@Component({
  selector: 'app-finalizar-solicitacao',
  standalone: true,
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    RouterModule,
    BreadcrumbComponent,
  ],
  templateUrl: './finalizar-solicitacao.component.html',
  styleUrl: './finalizar-solicitacao.component.scss',
})
export class FinalizarSolicitacaoComponent {
  id: number | null = null;
  solicitacaoData: any;
  solicitacao:Solicitacao = new Solicitacao();
  paths = [
    { label: 'Início', path: '/inicio/funcionarios' },
    { label: 'Todas as solicitações', path: '/solicitacoes/listar' },
    { label: 'Finalizar solicitação', path: '' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private solicitacaoService: SolicitacaoService,
    private modalService: ModalService,
    private progressBarService :ProgressService,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    let aux = this.route.snapshot.paramMap.get('idSolicitacao');
    if(aux) {
      const id = parseInt(aux);
      this.buscarSolicitacao(id)
    }
  }

  buscarSolicitacao (idSolicitacaoFromRoute:number) {
    this.progressBarService.show();
    this.solicitacaoService.findById(idSolicitacaoFromRoute).subscribe({
      next: (response) => {
        this.progressBarService.hide();
        this.solicitacao = response;
      }, error: (response) => {
        this.progressBarService.hide();
        let message = 'Ocorreu um erro ao processar a requisi&ccedil;&atilde;o.';
        
        if(response.error?.message)
          message = response.error?.message;
        
        this.modalService.open(ErrorModalComponent, {
          title: "Erro ao buscar solicitação",
          body: `<p>${message}</p>`,
          onClose: () => {
            this.router.navigate(['/inicio/funcionarios']);
          },
        });
      }
    });
  }

  getSolicitacaoInfo(id: number) {
    this.solicitacaoData = this.funcionarioService.getSolicitacaoInfo(id);
  }

  finalizarSolicitacao() {
    this.progressBarService.show();
    this.solicitacaoService.finalizar(this.solicitacao.id).subscribe({
      next: (response) => {
        this.progressBarService.hide();
        this.modalService.open(AlertModalComponent, {
          title:"Sucesso",
          body:"Solicitação finalizada efetuado com sucesso",
          onClose: () => {
            this.router.navigate(['/inicio/funcionarios']);
          },
        }); 
      }, error: (response) => {
        this.progressBarService.hide();
        let message = 'Ocorreu um erro ao processar a requisi&ccedil;&atilde;o.';
        
        if(response.error?.message)
            message = response.error?.message;
        
        this.modalService.open(ErrorModalComponent, {
          title: "Erro ao finalizar solicitação",
          body: `<p>${message}</p>`,
        });
      }
    });
  }
}
