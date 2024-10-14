import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FuncionarioService } from '../../../services/funcionario.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { funcionario } from '../../../models';

@Component({
  selector: 'app-editar-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './editar-funcionario.component.html',
  styleUrl: './editar-funcionario.component.scss'
})
export class EditarFuncionarioComponent implements OnInit {


  @ViewChild('formFuncionario') formFuncionario!: NgForm;
  funcionario: funcionario = new funcionario();

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    const res = this.funcionarioService.buscarPorId(id);
    if (res !== undefined)
      this.funcionario = res;
    else
      throw new Error("Pessoa não encontrada: id = " + id);
  }

  editarFuncionario(): void {
    this.funcionarioService.atualizar(this.funcionario);
    this.router.navigate(['/manter-funcionario']);
  }

}
