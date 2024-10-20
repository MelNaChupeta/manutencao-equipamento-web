import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FuncionarioService } from '../../../services/funcionario.service';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-efetuar-manutencao',
  standalone: true,
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    RouterModule,
    BreadcrumbComponent,
  ],
  templateUrl: './efetuar-manutencao.component.html',
  styleUrl: './efetuar-manutencao.component.scss',
})
export class EfetuarManutencaoComponent {
  id: number | null = null;

  maintenanceData: any;
  funcionariosList: any[] = [];

  funcionarioEscolhido: number | null = null;
  currentTab: string = 'efetuar';
  descricaoManutencao: string = '';
  orientacoes: string = '';

  paths = [
    { label: 'Início', path: '/inicio/funcionarios' },
    { label: 'Todas as solicitações', path: '/solicitacoes/listar' },
    { label: 'Efetuar manutenção', path: '' }
  ]


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    let aux = this.route.snapshot.paramMap.get('idSolicitacao');

    if (aux !== null) {
      this.id = parseInt(aux, 10);
    }

    if (this.id) {
      this.getManutencaoData(this.id);
      this.getFuncionariosList();
    }
  }

  getDataFromBackend(id: string) {
    // this.getManutencaoData(id);
    this.getFuncionariosList();
  }

  getManutencaoData(id: number) {
    this.maintenanceData = this.funcionarioService.getManutencaoData(id);
  }

  getFuncionariosList() {
    this.funcionariosList = this.funcionarioService.getFuncionariosList();
  }

  changeTab(tab: string) {
    this.currentTab = tab;
  }

  sendMaintenance() {
    const userEmail = localStorage.getItem('userEmail') || '';

    let data = {
      descricaoManutencao: this.descricaoManutencao,
      orientacoes: this.orientacoes,
      dataManutencao: new Date(),
      novoEstado: 'aguardandoPagamento',
      funcionario: userEmail,
    };
    console.log('Enviar:', data);
  }

  redirect() {
    const userEmail = localStorage.getItem('userEmail') || '';

    let data = {
      solicitacaoId: this.id,
      novoEstado: 'redirecionada',
      dataRedirecionamento: new Date(),
      funcionarioOrigem: userEmail,
      funcionarioDestino: this.funcionarioEscolhido,
    };

    console.log('redirecionando:', data);
  }
}
