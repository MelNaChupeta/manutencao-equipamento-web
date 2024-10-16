import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { funcionario } from '../../../models';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { faCircleNotch, faPencilSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { TabelaComponent } from '../../estilo-tabela/estilo-tabela.component';
import { FuncionarioService } from '../../../services/funcionario.service';


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
    private funcionarioService: FuncionarioService,
    private router: Router){
    
  }

  colunas: any[] = [
    { titulo: 'NOME', campo: 'name' },
    { titulo: 'EMAIL', campo: 'email' },
    { titulo: 'DATA NASCIMENTO', campo: 'dataNascimento' },
  ];

  buttons = [
    { icon: this.faPencil, iconClasses: 'text-3xl text-green  text-green-700', action: this.editar.bind(this) },
    { icon: this.faTrash, iconClasses: 'text-3xl text-red text-red-700', action: this.remover.bind(this) }
  ];

  ngOnInit(): void {
    this.funcionarios = this.listarTodos();
  }

  listarTodos(): funcionario[] {
    return this.funcionarioService.listarTodos();
  }

  remover(funcionario: funcionario): void {
    if (confirm(`Deseja realmente remover a pessoa ${funcionario.name}?`)) {
      this.funcionarioService.remover(funcionario.id!);
      this.funcionarios = this.listarTodos();
    }
  }

  editar(funcionario: funcionario): void {
    this.router.navigate(['/editar-funcionario', funcionario.id]);
  }
  

}