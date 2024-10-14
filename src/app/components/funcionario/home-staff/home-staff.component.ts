import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import mockSolicitacoes from './mockSolicitacoes.json';
import { Router, RouterModule } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario.service';

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

  solicitacoes : any[] = [];

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit():void {
    this.solicitacoes = this.listarSolicitacoesAbertas();
  }
  // solicitacoes = mockSolicitacoes;
  
  listarSolicitacoesAbertas(): any[] {
    return this.funcionarioService.listarSolicitacoesAbertas()
  }

}
