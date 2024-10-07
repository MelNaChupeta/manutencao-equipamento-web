import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import mockEfetuarManutencao from './mockEfetuarManutencao.json';
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
  data: any;
  valor: string = '';
  currentTab: string = 'efetuar';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('idSolicitacao');

    console.log('id ', this.id);
    if (this.id) {
      this.getDataFromBackend(this.id);
    }
  }

  getDataFromBackend(id: string) {
    const foundObject = mockEfetuarManutencao.find(
      (obj) => obj.id.toString() === id
    );

    if (foundObject) {
      this.data = foundObject;
      console.log('Dados encontrados:', this.data);
    } else {
      console.error('Objeto com o id fornecido não encontrado.');
    }
  }

  changeTab(tab: string) {
    this.currentTab = tab;
    console.log(this.currentTab, 'tab');
  }
}
