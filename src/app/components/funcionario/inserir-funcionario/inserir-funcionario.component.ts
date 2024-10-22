import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Router, RouterModule } from '@angular/router';
import { funcionario } from '../../../models';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalService } from '../../../services/modal.service';
import { ErrorModalComponent } from '../../common/modal/error-modal/error-modal.component';
import { AlertModalComponent } from '../../common/modal/alert-modal/alert-modal.component';

@Component({
  selector: 'app-inserir-funcionario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule, 
    FormsModule,
    RouterModule,
    NgxMaskPipe,
    FontAwesomeModule
  ],
  templateUrl: './inserir-funcionario.component.html',
  styleUrl: './inserir-funcionario.component.scss'
})
export class InserirFuncionarioComponent{


  @ViewChild('formFuncionario') formFuncionario! : NgForm;
  funcionario: funcionario = new funcionario();
  funcionarios: funcionario[] =[];

  constructor(
    private funcionarioService: FuncionarioService,
    private modalService:ModalService,
    private router: Router){
  }

  inserirFuncionario(): void {
    if (!this.formFuncionario.form.invalid) { 
      this.funcionarioService.inserir(this.funcionario);
      this.modalService.open(AlertModalComponent, {
        title:"Sucesso",
        body:"Funcionario Cadastrado com sucesso",
        onClose: () => {
          this.router.navigate(['/funcionario/manter']);
        },
      }); 
    }
  }

}
