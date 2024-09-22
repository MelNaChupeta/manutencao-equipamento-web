import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Solicitacao, solicitacoes } from '../../../solicitacoes';

@Component({
  selector: 'app-manter-solicitacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manter-solicitacao.component.html',
  styleUrl: './manter-solicitacao.component.scss',
})
export class ManterSolicitacaoComponent implements OnInit {
  solicitacao: Solicitacao | undefined;
  constructor(private route: ActivatedRoute) {}
  ngOnInit () {
    const routeParams = this.route.snapshot.paramMap;
    const idSolicitacaoFromRoute = routeParams.get('idSolicitacao');
    this.solicitacao = solicitacoes.find(solicitacao => solicitacao.id === idSolicitacaoFromRoute);
  }
}
