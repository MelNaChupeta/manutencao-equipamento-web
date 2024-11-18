import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario.service';
import { ToastService } from '../../../services/toast.service';


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

  constructor(private funcionarioService: FuncionarioService,private toastService: ToastService) {}

  ngOnInit(): void {
    this.solicitacoes = this.listarSolicitacoesAbertas();
  }
  
  listarSolicitacoesAbertas(): any[] {
    return this.funcionarioService.listarSolicitacoesAbertas();
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



}
