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
  selector: 'app-finalizar-solicitacao',
  standalone: true,
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    RouterModule,
    BreadcrumbComponent,
  ],
  templateUrl: './finalizar-solicitacao.component.html',
  styleUrl: './finalizar-solicitacao.component.scss',
})
export class FinalizarSolicitacaoComponent {
  id: number | null = null;
  solicitacaoData: any;
  paths = [
    { label: 'Início', path: '/inicio/funcionarios' },
    { label: 'Todas as solicitações', path: '/solicitacoes/listar' },
    { label: 'Finalizar solicitação', path: '' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    let aux = this.route.snapshot.paramMap.get('idSolicitacao');

    if (aux !== null) {
      this.id = parseInt(aux, 10);
    }

    if (this.id) this.getSolicitacaoInfo(this.id);
  }

  getSolicitacaoInfo(id: number) {
    this.solicitacaoData = this.funcionarioService.getSolicitacaoInfo(id);
  }

  finalizarSolicitacao() {
    const userEmail = localStorage.getItem('userEmail') || '';

    let data = {
      solicitacaoId: this.id,
      novoEstado: 'finalizada',
      dataFinalizacao: new Date(),
      funcionario: userEmail,
    };

    console.log('finalizando ...', data);

    this.router.navigate(['/ver-solicitacoes']);
  }
}
