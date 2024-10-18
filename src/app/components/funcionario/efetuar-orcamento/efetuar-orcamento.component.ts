import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FuncionarioService } from '../../../services/funcionario.service';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    RouterModule,
    BreadcrumbComponent,
  ],
  providers: [provideNgxMask()],

  templateUrl: './efetuar-orcamento.component.html',
  styleUrl: './efetuar-orcamento.component.scss',
})
export class EfetuarOrcamentoComponent implements OnInit {
  id: number | null = null;
  total: number = 0.0;
  data: any;
  valor: string = '';

  paths = [
    { label: 'Início', path: '/home-staff' },
    { label: 'Todas as solicitações', path: '/ver-solicitacoes' },
    { label: 'Efetuar orçamento', path: '' },
  ];

  items = [{ name: '', price: 0.0 }];

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
      this.getOrcamento(this.id);
    }
  }

  getOrcamento(id: number) {
    this.data = this.funcionarioService.getOrcamento(id);
  }

  updateTotal() {
    this.total = 0.0;
    this.items.forEach((item) => {
      this.total += item.price;
    });
  }

  addItem(): void {
    this.items.push({ name: '', price: 0.0 });
  }

  removeItem(i: number): void {
    this.items.splice(i, 1);
    this.updateTotal();
  }

  sendBudget() {
    const userEmail = localStorage.getItem('userEmail') || '';

    const data = {
      funcionario: userEmail,
      solicitacaoId: this.id,
      total: this.total,
      items: this.items,
    };

    console.log('enviando ...', data);
  }
}
