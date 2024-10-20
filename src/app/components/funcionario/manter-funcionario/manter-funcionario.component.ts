import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { funcionario } from '../../../models';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { faCircleNotch, faPencilSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { TabelaComponent } from '../../commom/estilo-tabela/estilo-tabela.component';
import { FuncionarioService } from '../../../services/funcionario.service';
import { ModalService } from '../../../services/modal.service';
import { ConfirmModalComponent } from '../../commom/modal/confirm-modal/confirm-modal.component';


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
  funcionarios: funcionario[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private funcionarioService: FuncionarioService,
    private router: Router){
    
  }

  colunas: any[] = [
    { titulo: 'NOME', campo: 'name' },
    { titulo: 'EMAIL', campo: 'email' },
    { titulo: 'DATA NASCIMENTO', campo: 'dataNascimento' },
  ];

  buttons = [
    { body: `<i class="fa-solid fa-pen-to-square"></i>`, class: 'text-3xl text-green  text-green-700', action: this.editar.bind(this) },
    { body: `<i class="fa-solid fa-trash"></i>`, class: 'text-3xl text-red text-red-700', action: this.remover.bind(this) }
  ];

  ngOnInit(): void {
    this.funcionarios = this.listarTodos();
  }

  listarTodos(): funcionario[] {
    return this.funcionarioService.listarTodos();
  }

  remover(funcionario: funcionario): void {
    this.modalService.open(ConfirmModalComponent, {
      title:"Confirmar Ação",
      body:"Tem certeza que deseja excluir esse item?",
      onConfirm: () => {
        this.funcionarioService.remover(funcionario.id!);
        this.funcionarios = this.listarTodos();
      }
    });
  }

  editar(funcionario: funcionario): void {
    this.router.navigate(['/funcionario/editar', funcionario.id]);
  }
  

}