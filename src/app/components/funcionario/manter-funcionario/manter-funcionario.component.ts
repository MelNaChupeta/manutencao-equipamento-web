import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Funcionario } from '../../../models';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { faCircleNotch, faPencilSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { TabelaComponent } from '../../common/estilo-tabela/estilo-tabela.component';
import { FuncionarioService } from '../../../services/funcionario.service';
import { ModalService } from '../../../services/modal.service';
import { ConfirmModalComponent } from '../../common/modal/confirm-modal/confirm-modal.component';
import { ProgressService } from '../../../services/progress.service';
import { AlertModalComponent } from '../../common/modal/alert-modal/alert-modal.component';
import { ErrorModalComponent } from '../../common/modal/error-modal/error-modal.component';


@Component({
  selector: 'app-manter-funcionario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    TabelaComponent,
    RouterModule
  ],
  templateUrl: './manter-funcionario.component.html',
  styleUrl: './manter-funcionario.component.scss'
})
export class ManterFuncionarioComponent {

  faPencil:IconDefinition  = faPencilSquare;
  faTrash:IconDefinition  = faTrash;
  faPlus:IconDefinition  = faPlus;
  isValidating: boolean = false;
  isLoading: boolean = false;
  loadingCep: boolean = false;
  faLoading: IconDefinition = faCircleNotch;
  funcionarios: Funcionario[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private funcionarioService: FuncionarioService,
    private progressBarService: ProgressService,
    private router: Router){
    
  }

  colunas: any[] = [
    { titulo: 'NOME', campo: 'nome' },
    { titulo: 'EMAIL', campo: 'email' },
    { titulo: 'DATA NASCIMENTO', campo: 'dtNascimento' },
  ];

  buttons = [
    { body: `<i class="fa-solid fa-pen-to-square"></i>`, class: 'text-3xl text-green  text-green-700', action: this.editar.bind(this) },
    { body: `<i class="fa-solid fa-trash"></i>`, class: 'text-3xl text-red text-red-700', action: this.remover.bind(this) }
  ];

  ngOnInit(): void {
     this.listarTodos();
  }

  listarTodos() {
    this.progressBarService.show();
    this.funcionarioService.listarTodos().subscribe({
      next: (response) => {
        this.progressBarService.hide();
        this.funcionarios = response;
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

  remover(funcionario: Funcionario): void {
    this.modalService.open(ConfirmModalComponent, {
      title:"Confirmar Ação",
      body:"Tem certeza que deseja excluir esse item?",
      onConfirm: () => {
        this.progressBarService.show();
        this.funcionarioService.remover(funcionario.id!).subscribe({
          next: (response) => {
            this.progressBarService.hide();
            this.listarTodos();
          }, error: (response) => {
            this.progressBarService.hide();
            let message = 'Ocorreu um erro ao processar a requisi&ccedil;&atilde;o.';
            
            if(response.error?.message)
              message = response.error?.message;
            
            this.modalService.open(ErrorModalComponent, {
              title: "Erro ao remover funcionario",
              body: `<p>${message}</p>`,
            });
          }
        });
      }
    });
  }

  editar(funcionario: Funcionario): void {
    this.router.navigate(['/funcionario/editar', funcionario.id]);
  }
  

}