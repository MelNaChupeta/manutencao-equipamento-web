import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import mockEfetuarManutencao from './mockEfetuarManutencao.json';
import mockFuncionarios from './mockFuncionarios.json';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-efetuar-manutencao',
  standalone: true,
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './efetuar-manutencao.component.html',
  styleUrl: './efetuar-manutencao.component.scss',
})
export class EfetuarManutencaoComponent {
  id: string | null = null;
  maintenanceData: any;
  funcionariosList: any;
  funcionarioEscolhido: number | null = null;
  currentTab: string = 'efetuar';
  descricaoManutencao: string = '';
  orientacoes: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('idSolicitacao');

    if (this.id) this.getDataFromBackend(this.id);
  }

  getDataFromBackend(id: string) {
    this.getManutencaoData(id);
    this.getFuncionariosList();
  }

  getManutencaoData(id: string) {
    const foundObject = mockEfetuarManutencao.find(
      (obj) => obj.id.toString() === id
    );

    if (foundObject) {
      this.maintenanceData = foundObject;
      console.log('Dados encontrados:', this.maintenanceData);
    } else {
      console.error('Objeto com o id fornecido não encontrado.');
    }
  }

  getFuncionariosList() {
    this.funcionariosList = mockFuncionarios;
  }

  changeTab(tab: string) {
    this.currentTab = tab;
  }

  sendMaintenance() {
    let data = {
      descricaoManutencao: this.descricaoManutencao,
      orientacoes: this.orientacoes,
      dataManutencao: new Date(),
      novoEstado: 'aguardandoPagamento',
      // TODO: colocar funcionario aqui
      funcionario: 'fulano',
    };
    console.log('Enviar:', data);
  }

  redirect() {
    // TODO: achar um jeito de proibir o funcionario de selecionar ele mesmo
    let data = {
      solicitacaoId: this.id,
      novoEstado: 'redirecionada',
      dataRedirecionamento: new Date(),
      // TODO: colocar funcionario aqui
      funcionarioOrigem: 'fulano',
      funcionarioDestino: this.funcionarioEscolhido,
    };

    console.log('redirecionando:', data);
  }
}
