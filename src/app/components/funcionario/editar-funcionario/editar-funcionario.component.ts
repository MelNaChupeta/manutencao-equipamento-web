import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FuncionarioService } from '../../../services/funcionario.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Funcionario } from '../../../models';
import { AlertModalComponent } from '../../common/modal/alert-modal/alert-modal.component';
import { ModalService } from '../../../services/modal.service';
import { ErrorModalComponent } from '../../common/modal/error-modal/error-modal.component';
import { ProgressService } from '../../../services/progress.service';

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
  funcionario: Funcionario = new Funcionario();
  isLoading:boolean = false;
  
  constructor(
    private funcionarioService: FuncionarioService,
    private progressBarService: ProgressService,
    private router: Router,
    private modalService:ModalService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['idFuncionario'];
    this.funcionarioService.buscarPorId(id).subscribe({
      next: (response) => {
        this.progressBarService.hide();
        let data   = response.dtNascimento?.split("/"); 
        if(data?.length) {
          let dtNascimento =  `${data[2]}-${data[1]}-${data[0]}`;
          response.dtNascimento = dtNascimento;
        }
        this.funcionario = response;
      }, error: (response) => {
        this.progressBarService.hide();
        let message = 'Ocorreu um erro ao processar a requisi&ccedil;&atilde;o.';
        
        if(response.error?.message)
          message = response.error?.message;
        
        this.modalService.open(ErrorModalComponent, {
          title: "Erro ao buscar funcionario",
          body: `<p>${message}</p>`,
          onClose: () => {
            this.router.navigate(['/funcionario/manter']);
          },
        });
      }
    });
  }

  editarFuncionario(): void {
    this.progressBarService.show();
    this.funcionarioService.atualizar(this.funcionario).subscribe({
      next: (response) => {
        this.progressBarService.hide();
        this.isLoading = false;
        this.modalService.open(AlertModalComponent, {
          title:"Sucesso",
          body:"Funcionário alterado com sucesso",
          onClose: () => {
            this.router.navigate(['/funcionario/manter']);
          },
        }); 
      }, error: (response) => {
        this.progressBarService.hide();
        this.isLoading = false;
        let message = 'Ocorreu um erro ao processar a requisi&ccedil;&atilde;o.';
        
        if(response.error?.message)
          message = response.error?.message;
        
        this.modalService.open(ErrorModalComponent, {
          title: "Erro ao buscar funcionario",
          body: `<p>${message}</p>`,
        });
      }
    });
  }

}
