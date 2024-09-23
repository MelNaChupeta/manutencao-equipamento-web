import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Solicitacao, solicitacoes, Movimentacao } from '../../../solicitacoes';
import { NgOptimizedImage, registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';

registerLocaleData(localePT);

@Component({
  selector: 'app-manter-solicitacao',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './manter-solicitacao.component.html',
  styleUrl: './manter-solicitacao.component.scss',
})
export class ManterSolicitacaoComponent implements OnInit {
  solicitacao: Solicitacao | undefined;
  solicitacoes = solicitacoes;
  movimentacao: Movimentacao | undefined;
  constructor(private route: ActivatedRoute) {}
  ngOnInit () {
    const routeParams = this.route.snapshot.paramMap;
    const idSolicitacaoFromRoute = routeParams.get('idSolicitacao');
    this.solicitacao = solicitacoes.find(solicitacao => solicitacao.id === idSolicitacaoFromRoute);
  };
  imagemControle = "../../../../assets/controle.png";
}
