import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import mockOrcamento from './mockOrcamento.json';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


export enum TipoEquipamento {
  notebook = 'Notebook/laptop',
  desktop = 'Desktop',
  celular = 'Celular',
  tablet = 'Tablet',
  impressora = 'Impressora',
  mouse = 'Mouse',
  teclado = 'Teclado',
  televisao = 'Televisão',
  camera = 'Câmera',
  drone = 'Drone',
  videogameConsole = 'Console de videogame',
  videogameAcessorio = 'Acessório de videogame',
}

@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    RouterModule,
  ],
  providers: [provideNgxMask()],

  templateUrl: './efetuar-orcamento.component.html',
  styleUrl: './efetuar-orcamento.component.scss',
})
export class EfetuarOrcamentoComponent implements OnInit {
  id: string | null = null;
  data: any;
  valor: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('idSolicitacao');

    console.log('id ',this.id)
    if (this.id) {
      this.getDataFromBackend(this.id);
    }
  }

  getDataFromBackend(id:string) {
    const foundObject = mockOrcamento.find(obj => obj.id.toString() === id);
    
    if (foundObject) {
      this.data = foundObject;
      console.log('Dados encontrados:', this.data);
    } else {
      console.error('Objeto com o id fornecido não encontrado.');
    }

  }

}
