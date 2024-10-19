import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Router, RouterModule } from '@angular/router';
import { funcionario } from '../../../models';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    private router: Router){
  }

  inserirFuncionario(): void {
    if (this.formFuncionario.form.invalid) {
      const confirmExit = window.confirm('O formulário não foi preenchido corretamente. Deseja sair sem finalizar o cadastro?');
      if (!confirmExit) {
        return; 
      }
      this.router.navigate(['/manter-funcionario']);
    } else {
      this.funcionarioService.inserir(this.funcionario);
      this.router.navigate(['/manter-funcionario']);
    }
  }
  

}
