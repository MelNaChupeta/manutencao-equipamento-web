import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import mockFinalizarSolicitacao from './mockFinalizarSolicitacao.json';

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
  id: string | null = null;
  solicitacaoData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('idSolicitacao');

    if (this.id) this.getDataFromBackend(this.id);
  }

  getDataFromBackend(id: string) {
    const data = mockFinalizarSolicitacao.find(
      (obj) => obj.id.toString() === id
    );

    if (data) {
      this.solicitacaoData = data;
      console.log('Dados encontrados:', this.solicitacaoData);
    } else {
      console.error('Objeto com o id fornecido não encontrado.');
    }
  }

  finalizarSolicitacao() {
    let data = {
      solicitacaoId: this.id,
      novoEstado: 'finalizada',
      dataFinalizacao: new Date(),
      // TODO: colocar funcionario aqui
      funcionario: 'fulano',
    };

    console.log('finalizando ...', data);

    this.router.navigate(['/ver-solicitacoes']);
  }
}
