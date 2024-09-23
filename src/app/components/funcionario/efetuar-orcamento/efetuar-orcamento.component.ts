import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import mockOrcamento from './mockOrcamento.json';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, NgxMaskDirective, NgxMaskPipe, FormsModule],
  providers: [provideNgxMask()],

  templateUrl: './efetuar-orcamento.component.html',
  styleUrl: './efetuar-orcamento.component.scss',
})
export class EfetuarOrcamentoComponent {
  data = mockOrcamento;

  valor: string = '';
}
