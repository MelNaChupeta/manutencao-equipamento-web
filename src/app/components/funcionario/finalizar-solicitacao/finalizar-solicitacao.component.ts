import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import mockFinalizarSolicitacao from './mockFinalizarSolicitacao.json';
import { FuncionarioService } from '../../../services/funcionario.service';

@Component({
  selector: 'app-finalizar-solicitacao',
  standalone: true,
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './finalizar-solicitacao.component.html',
  styleUrl: './finalizar-solicitacao.component.scss',
})
export class FinalizarSolicitacaoComponent {
  id: number | null = null;
  solicitacaoData: any;

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
    console.log('veio', this.solicitacaoData);
  }

  finalizarSolicitacao() {
    let data = {
      solicitacaoId: this.id,
      novoEstado: 'finalizada',
      dataFinalizacao: new Date(),
      funcionario: '',
    };

    console.log('finalizando ...', data);

    this.router.navigate(['/ver-solicitacoes']);
  }
}
