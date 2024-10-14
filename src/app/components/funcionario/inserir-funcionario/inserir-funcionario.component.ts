import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Router, RouterModule } from '@angular/router';
import { funcionario } from '../../../models';

@Component({
  selector: 'app-inserir-funcionario',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule
  ],
  templateUrl: './inserir-funcionario.component.html',
  styleUrl: './inserir-funcionario.component.scss'
})
export class InserirFuncionarioComponent{


  @ViewChild('formFuncionario') formFuncionario! : NgForm;
  funcionario: funcionario = new funcionario();

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router){
  }

  inserirFuncionario(): void {
    this.funcionarioService.inserir(this.funcionario);
    this.router.navigate(["/manter-funcionario"]);
  }

  

}
