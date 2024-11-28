import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FuncionarioService } from '../../../services/funcionario.service';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { Funcionario, Solicitacao } from '../../../models';
import { ModalService } from '../../../services/modal.service';
import { ProgressService } from '../../../services/progress.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { ErrorModalComponent } from '../../common/modal/error-modal/error-modal.component';
import { AlertModalComponent } from '../../common/modal/alert-modal/alert-modal.component';

@Component({
  selector: 'app-efetuar-manutencao',
  standalone: true,
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    RouterModule,
    BreadcrumbComponent,
  ],
  templateUrl: './efetuar-manutencao.component.html',
  styleUrl: './efetuar-manutencao.component.scss',
})
export class EfetuarManutencaoComponent {
  id: number | null = null;

  maintenanceData: any;
  funcionariosList: Funcionario[] = [];
  solicitacao:Solicitacao = new Solicitacao();
  funcionarioEscolhido: number | null = null;
  currentTab: string = 'efetuar';
  descricaoManutencao: string = '';
  orientacoes: string = '';

  paths = [
    { label: 'Início', path: '/inicio/funcionarios' },
    { label: 'Todas as solicitações', path: '/solicitacoes/listar' },
    { label: 'Efetuar manutenção', path: '' }
  ]


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private solicitacaoService: SolicitacaoService,
    private modalService: ModalService,
    private progressBarService :ProgressService
  ) {}


  ngOnInit(): void {
    let aux = this.route.snapshot.paramMap.get('idSolicitacao');
    if(aux) {
      const id = parseInt(aux);
      this.buscarSolicitacao(id)
      this.getFuncionariosList();
    }
  }

  buscarSolicitacao (idSolicitacaoFromRoute:number) {
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
          title: "Erro ao buscar categoria",
          body: `<p>${message}</p>`,
          onClose: () => {
            this.router.navigate(['/inicio/clientes']);
          },
        });
      }
    });
  }

  getDataFromBackend(id: string) {
    // this.getManutencaoData(id);
    this.getFuncionariosList();
  }

  getManutencaoData(id: number) {
    this.maintenanceData = this.funcionarioService.getManutencaoData(id);
  }

  getFuncionariosList() {
    //this.funcionariosList = this.funcionarioService.getFuncionariosList();
    this.progressBarService.show();
    this.funcionarioService.listarTodos().subscribe({
      next: (response) => {
        this.progressBarService.hide();
        this.funcionariosList = response;
      }, error: (response) => {
        this.progressBarService.hide();
        let message = 'Ocorreu um erro ao processar a requisi&ccedil;&atilde;o.';
        
        if(response.error?.message)
          message = response.error?.message;
        
        this.modalService.open(ErrorModalComponent, {
          title: "Erro ao buscar lista",
          body: `<p>${message}</p>`,
        });
      }
    });
  }

  changeTab(tab: string) {
    this.currentTab = tab;
  }

  sendMaintenance() {
    const userEmail = localStorage.getItem('userEmail') || '';

    /*let data = {
      descricaoManutencao: this.descricaoManutencao,
      orientacoes: this.orientacoes,
      dataManutencao: new Date(),
      novoEstado: 'aguardandoPagamento',
      funcionario: userEmail,
    };
    console.log('Enviar:', data);*/
    const data:Solicitacao = {
      id:  this.solicitacao.id,
      descricaoManutencao: this.descricaoManutencao,
      orientacaoCliente: this.orientacoes
    };
    this.solicitacaoService.efeturarManutencao(data).subscribe({
      next: (response) => {
        this.progressBarService.hide();
        this.modalService.open(AlertModalComponent, {
          title:"Sucesso",
          body:"Manutenção efetuada  com sucesso",
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
          title: "Erro ao efetuar manutenção",
          body: `<p>${message}</p>`,
        });
      }
    });
  }

  redirect() {
   /* const userEmail = localStorage.getItem('userEmail') || '';

    let data = {
      solicitacaoId: this.id,
      novoEstado: 'redirecionada',
      dataRedirecionamento: new Date(),
      funcionarioOrigem: userEmail,
      funcionarioDestino: this.funcionarioEscolhido,
    };

    console.log('redirecionando:', data);*/
    if(this.funcionarioEscolhido) {
      
      const data:Solicitacao = {
        id:  this.solicitacao.id,
        funcionario: {
          id: this.funcionarioEscolhido
        }
      };

      this.solicitacaoService.redirecionar(data).subscribe({
        next: (response) => {
          this.progressBarService.hide();
          this.modalService.open(AlertModalComponent, {
            title:"Sucesso",
            body:"Redirecionamento efetuado  com sucesso",
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
            title: "Erro ao efetuar manutenção",
            body: `<p>${message}</p>`,
          });
        }
      });
    }
    
  }
}
