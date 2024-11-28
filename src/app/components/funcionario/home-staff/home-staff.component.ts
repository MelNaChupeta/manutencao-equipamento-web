import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario.service';
import { ToastService } from '../../../services/toast.service';
import { ModalService } from '../../../services/modal.service';
import { ProgressService } from '../../../services/progress.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { ErrorModalComponent } from '../../common/modal/error-modal/error-modal.component';
import { EstadoSolicitacao } from '../../../models';


export interface Solicitacao {
  id: number;
  dtHrCriacao: string;
  client: string;
  descricaoEquipamento: string;
  estadoAtual: string;
}

@Component({
  selector: 'app-home-staff',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-staff.component.html',
  styleUrl: './home-staff.component.scss',
})
export class HomeStaffComponent implements OnInit {
  solicitacoes: any[] = [];

  constructor(private funcionarioService: FuncionarioService,
              private toastService: ToastService,
              private solicitacaoService: SolicitacaoService,
              private modalService: ModalService,
              private progressBarService :ProgressService) {}

  ngOnInit(): void {
    this.buscarSolicitacoes();
  }
  

  // showSuccess(): void {
  //   this.toastService.showToast('This is a success message!', 'success',50000);
  // }

  // showError(): void {
  //   this.toastService.showToast('This is an error message!', 'error');
  // }

  // showInfo(): void {
  //   this.toastService.showToast('This is an info message!', 'info');
  // }

  // showWarning(): void {
  //   this.toastService.showToast('This is a warning message!', 'warning');
  // }

  buscarSolicitacoes() {
    this.solicitacaoService.buscarPorFiltros({estadoAtual:EstadoSolicitacao.aberta}).subscribe({
      next: (response) => {
          this.progressBarService.hide();
          this.solicitacoes = response;
      },
      error: (response) => {
        let message = response.error?.message ? response.error?.message : "Erro ao buscar s"
        this.progressBarService.hide();
        this.modalService.open(ErrorModalComponent, {
          title:"Atenção",
          body:`<p>${message}</p>`
        });  
      }
    });
  }

}
