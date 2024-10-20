import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FuncionarioService } from '../../../services/funcionario.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { funcionario } from '../../../models';
import { AlertModalComponent } from '../../commom/modal/alert-modal/alert-modal.component';
import { ModalService } from '../../../services/modal.service';
import { ErrorModalComponent } from '../../commom/modal/error-modal/error-modal.component';

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
    private modalService:ModalService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['idFuncionario'];
    const res = this.funcionarioService.buscarPorId(id);
    if (res !== undefined)
      this.funcionario = res;
    else
    this.modalService.open(ErrorModalComponent, {
      title:"Atenção",
      body:"Erro ao buscar funcionario",
      onClose: () => {
        this.router.navigate(['/manter-funcionario']);
      },
    });   
  }

  editarFuncionario(): void {
    this.funcionarioService.atualizar(this.funcionario);
    this.modalService.open(AlertModalComponent, {
      title:"Sucesso",
      body:"Funcionario alterado com sucesso",
      onClose: () => {
        this.router.navigate(['/manter-funcionario']);
      },
    });   
  }

}
