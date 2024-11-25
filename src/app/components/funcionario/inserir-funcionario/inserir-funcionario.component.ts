import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Router, RouterModule } from '@angular/router';
import { Funcionario } from '../../../models';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalService } from '../../../services/modal.service';
import { ErrorModalComponent } from '../../common/modal/error-modal/error-modal.component';
import { AlertModalComponent } from '../../common/modal/alert-modal/alert-modal.component';
import { ProgressService } from '../../../services/progress.service';

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
  funcionario: Funcionario = new Funcionario();
  funcionarios: Funcionario[] =[];

  constructor(
    private funcionarioService: FuncionarioService,
    private progressBarService: ProgressService,
    private modalService:ModalService,
    private router: Router){
  }

  inserirFuncionario(): void {
    if (!this.formFuncionario.form.invalid) { 
      this.progressBarService.show();

      this.funcionarioService.inserir(this.funcionario).subscribe({
        next: (response) => {
          this.progressBarService.hide();
          this.modalService.open(AlertModalComponent, {
            title:"Sucesso",
            body:"Funcionario Cadastrado com sucesso",
            onClose: () => {
              this.router.navigate(['/funcionario/manter']);
            },
          }); 
        }, error: (response) => {
          this.progressBarService.hide();
          let message = 'Ocorreu um erro ao processar a requisi&ccedil;&atilde;o.';
          
          if(response.error?.message)
            message = response.error?.message;
          
          this.modalService.open(ErrorModalComponent, {
            title: "Erro ao inserir funcionario",
            body: `<p>${message}</p>`,
          });
        }
      });
    }
  }

}
